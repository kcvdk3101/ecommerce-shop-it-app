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

  const { product, error } = productDetails;
  const { loading, error: updateError, isUpdated } = productDB;

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);

  const [oldImages, setOldImages] = useState([]);

  useEffect(() => {
    if (product && product._id !== match.params.id) {
      getProductDetails(match.params.id);
    } else {
      setName(product.name);
      setBrand(product.brand);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setSeller(product.seller);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (updateError) {
      toast.error(updateError);
      clearErrors();
    }

    if (isUpdated) {
      history.push("/admin/products");
      toast.success("Product updated successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    history,
    match.params.id,
    getProductDetails,
    clearErrors,
    product,
    error,
    updateError,
    isUpdated,
  ]);

  const onChangeImage = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setOldImages([]);
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
      product._id,
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
            loading={loading}
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
  };
}

const mapDispatchToProps = {
  updateProduct: productActions.updateProduct,
  getProductDetails: productActions.getProductDetails,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
