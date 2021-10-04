import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import { NEW_PRODUCT_RESET } from "../../actions/actionTypes/productActionTypes";
import { clearErrors } from "../../actions/clearErrors";
import productActions from "../../actions/productActions";
import putFormDataInAddNewProduct from "../../utils/putFormDataInAddNewProduct";
import MetaData from "../common/MetaData";
import AddNewProductForm from "../form/AddNewProductForm";
import Sidebar from "./Sidebar";

const AddNewProduct = ({ clearErrors, history, newProduct, addNewProduct }) => {
  const [productInfo, setProductInfo] = useState({
    name: "",
    brand: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
    seller: "",
  });
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (newProduct.error) {
      toast.error(newProduct.error);
      clearErrors();
    }

    if (newProduct.success) {
      toast.success("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
      history.push("/admin/products");
    }
  }, [dispatch, newProduct, history, clearErrors]);

  const submitHandler = (e) => {
    e.preventDefault();
    addNewProduct(putFormDataInAddNewProduct(productInfo, images));
  };

  const handleChangeInput = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeImage = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState !== 2) return;
        setImages((prevArray) => [...prevArray, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title={"New Product"} />
      <Row>
        <Col xs={12} md={2}>
          <Sidebar />
        </Col>

        <Col xs={12} md={10}>
          <AddNewProductForm
            newProduct={newProduct}
            name={productInfo.name}
            brand={productInfo.brand}
            price={productInfo.price}
            description={productInfo.description}
            category={productInfo.category}
            stock={productInfo.stock}
            seller={productInfo.seller}
            images={images}
            handleChangeInput={handleChangeInput}
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
    newProduct: state.newProduct,
  };
}

const mapDispatchToProps = {
  addNewProduct: productActions.newProduct,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewProduct);
