import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux";
import { clearErrors } from "../../actions/clearErrors";
import productActions from "../../actions/productActions";
import { CATEGORIES } from "../../constant";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const UpdateProduct = ({
  productDB,
  productDetails,
  match,
  history,
  updateProduct,
  getProductDetails,
  clearErrors,
}) => {
  const { error, product } = productDetails;
  const { loading, error: updateError, isUpdated } = productDB;
  const productId = match.params.id;

  const alert = useAlert();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (product && product._id !== productId) {
      getProductDetails(productId);
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setSeller(product.seller);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);
      clearErrors();
    }

    if (updateError) {
      alert.error(updateError);
      clearErrors();
    }

    if (isUpdated) {
      history.push("/admin/products");
      alert.success("Product updated successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    history,
    updateError,
    product,
    productId,
    getProductDetails,
    clearErrors,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(product._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title={"Update Product"} />
      <Row>
        <Col xs={12} md={2}>
          <Sidebar />
        </Col>

        <Col xs={12} md={10}>
          <Form
            className="p-3"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1>Update Product</h1>

            <FormGroup>
              <Label htmlFor="name_field">Name</Label>
              <Input
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="price_field">Price</Label>
              <Input
                type="text"
                id="price_field"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description_field">Description</Label>
              <textarea
                className="form-control"
                id="description_field"
                rows="8"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="category_field">Category</Label>
              <select
                className="form-control"
                id="category_field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="stock_field">Stock</Label>
              <Input
                type="number"
                id="stock_field"
                className="form-control"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="seller_field">Seller Name</Label>
              <Input
                type="text"
                id="seller_field"
                className="form-control"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Images</Label>

              <div className="custom-file">
                <Input
                  type="file"
                  name="product_images"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChange}
                  multiple
                />
                <Label className="custom-file-label" htmlFor="customFile">
                  Choose Images
                </Label>
              </div>

              {oldImages &&
                oldImages.map((img) => (
                  <img
                    key={img}
                    src={img.url}
                    alt={img.url}
                    className="mt-3 mr-2"
                    width="55"
                    height="52"
                  />
                ))}

              {imagesPreview.map((img) => (
                <img
                  src={img}
                  key={img}
                  alt="Images Preview"
                  className="mt-3 mr-2"
                  width="55"
                  height="52"
                />
              ))}
            </FormGroup>

            <Button
              color="warning"
              block
              className="py-3 text-white text-uppercase"
              disabled={loading ? true : false}
            >
              update product
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

function mapStateToProps(state) {
  return {
    productDB: state.product,
    productDetails: state.productDetails,
    newProduct: state.newProduct,
  };
}

const mapDispatchToProps = {
  updateProduct: productActions.updateProduct,
  getProductDetails: productActions.getProductDetails,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
