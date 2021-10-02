import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux";
import { Col, Row } from "reactstrap";
import { clearErrors } from "../../actions/clearErrors";
import productActions from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import putFormDataInAddNewProduct from "../../utils/putFormDataInAddNewProduct";
import AddNewProductForm from "../form/AddNewProductForm";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

const AddNewProduct = ({ clearErrors, history, newProduct, addNewProduct }) => {
  console.log(newProduct);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (newProduct.error) {
      alert.error(newProduct.error);
      clearErrors();
    }

    if (newProduct.success) {
      alert.success("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
      history.push("/admin/products");
    }
  }, [dispatch, alert, newProduct, history, clearErrors]);

  const submitHandler = (e) => {
    e.preventDefault();
    addNewProduct(
      putFormDataInAddNewProduct(
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

  const onChangeImage = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState !== 2) return;
        setImagesPreview((prevArray) => [...prevArray, reader.result]);
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
            name={name}
            brand={brand}
            price={price}
            description={description}
            category={category}
            stock={stock}
            seller={seller}
            imagesPreview={imagesPreview}
            setBrand={setBrand}
            setName={setName}
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
    newProduct: state.newProduct,
  };
}

const mapDispatchToProps = {
  addNewProduct: productActions.newProduct,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewProduct);
