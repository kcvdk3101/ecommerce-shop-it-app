const Product = require('../models/product.model')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

// Create new product   =>   /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  let images = []
  if (typeof req.body.images === 'string') {
    images.push(req.body.images)
  } else {
    images = req.body.images
  }

  let imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: `products/${req.body.category.toLowerCase()}/${req.body.brand.toLowerCase()}`
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url
    })
  }

  req.body.images = imagesLinks
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product
  })
})

// Get all products   =>   /api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const productsCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .filter()
  let products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    productsCount,
    products
  })
})

// Get all products   =>   /api/v1/products?keyword=...
exports.getProductsByConditions = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 6;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage)
  products = await apiFeatures.query;


  res.status(200).json({
    success: true,
    productsCount,
    resPerPage,
    filteredProductsCount,
    products
  })
})

// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products
  })

})

// Get single product details   =>   /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  res.status(200).json({
    success: true,
    product
  })

})

// Update Product   =>   /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  let newImages = []
  if (typeof req.body.images === 'string') {
    newImages.push(req.body.images)
  } else {
    newImages = req.body.images
  }

  if (newImages !== undefined) {
    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    // New update images
    let newImagesLinks = [];
    for (let i = 0; i < newImages.length; i++) {
      const result = await cloudinary.v2.uploader.upload(newImages[i], {
        folder: `products/${req.body.category.toLowerCase()}/${req.body.brand.toLowerCase()}`
      });

      newImagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url
      })
    }
    req.body.images = newImagesLinks
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    product
  })

})

// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Deleting images associated with the product
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id)
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product is deleted.'
  })

})

// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId, firstName, lastName } = req.body;

  const review = {
    user: req.user._id,
    firstName: firstName,
    lastName: lastName,
    rating: Number(rating),
    comment
  }

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    r => r.user.toString() === req.user._id.toString()
  )

  if (isReviewed) {
    product.reviews.forEach(review => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    })

  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length
  }

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true
  })

})

// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
  const numOfReviews = reviews.length;
  const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true
  })
})