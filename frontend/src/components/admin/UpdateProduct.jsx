import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import { UPDATE_PRODUCT_RESET } from "../../actions/actionTypes/productActionTypes";
import { clearErrors } from "../../actions/clearErrors";
import productActions from "../../actions/productActions";
import putFormDataInUpdateProduct from "../../utils/putFormDataInUpdateProduct";
import MetaData from "../common/MetaData";
import UpdateProductForm from "../form/UpdateProductForm";
import Sidebar from "./Sidebar";

const UpdateProduct = ({
  productDB,
  productDetails,
  match,
  history,
  updateProduct,
  getProductDetails,
  clearErrors,
}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [oldImages, setOldImages] = useState([]);

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (
      productDetails.product &&
      productDetails.product._id !== match.params.id
    ) {
      getProductDetails(match.params.id);
    } else {
      setName(productDetails.product.name);
      setBrand(productDetails.product.brand);
      setPrice(productDetails.product.price);
      setDescription(productDetails.product.description);
      setCategory(productDetails.product.category);
      setSeller(productDetails.product.seller);
      setStock(productDetails.product.stock);
      setOldImages(productDetails.product.images);
    }

    if (productDetails.error) {
      toast.error(productDetails.error);
      clearErrors();
    }

    if (productDB.updateError) {
      toast.error(productDB.updateError);
      clearErrors();
    }

    if (productDB.isUpdated) {
      history.push("/admin/products");
      toast.success("Product updated successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    history,
    match.params.id,
    productDetails,
    productDB,
    getProductDetails,
    clearErrors,
  ]);

  const onChangeImage = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct(
      productDetails.product._id,
      putFormDataInUpdateProduct(
        name,
        brand,
        price,
        description,
        category,
        stock,
        seller,
        images
      )
    );
  };

  return (
    <>
      <MetaData title={"Update Product"} />
      <Row>
        <Col xs={12} md={2}>
          <Sidebar />
        </Col>

        <Col xs={12} md={10}>
          <UpdateProductForm
            loading={productDB.loading}
            name={name}
            brand={brand}
            price={price}
            description={description}
            category={category}
            stock={stock}
            seller={seller}
            oldImages={oldImages}
            images={images}
            setName={setName}
            setBrand={setBrand}
            setPrice={setPrice}
            setDescription={setDescription}
            setCategory={setCategory}
            setStock={setStock}
            setSeller={setSeller}
            onChangeImage={onChangeImage}
            submitHandler={submitHandler}
          />
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
