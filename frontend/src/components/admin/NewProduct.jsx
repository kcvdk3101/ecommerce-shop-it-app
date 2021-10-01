import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux";
import { clearErrors } from "../../actions/clearErrors";
import productActions from "../../actions/productActions";
import { CATEGORIES } from "../../constant";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const NewProduct = ({ clearErrors, history, newProduct, addNewProduct }) => {
  const [name, setName] = useState("");
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
      history.push("/admin/products");
      alert.success("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, newProduct, history, clearErrors]);

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

    dispatch(addNewProduct(formData));
  };

  const onChangeImage = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

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
      <MetaData title={"New Product"} />
      <Row>
        <Col xs={12} md={2}>
          <Sidebar />
        </Col>

        <Col xs={12} md={10}>
          <Form
            onSubmit={submitHandler}
            encType="multipart/form-data"
            className="p-3"
          >
            <h1>New Product</h1>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="name_field">Name</Label>
                  <Input
                    type="text"
                    id="name_field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="price_field">Price</Label>
                  <Input
                    type="text"
                    id="price_field"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label htmlFor="description_field">Description</Label>
              <textarea
                id="description_field"
                className="form-control"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </FormGroup>

            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label htmlFor="category_field">Category</Label>
                  <select
                    id="category_field"
                    className="form-control"
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
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label htmlFor="stock_field">Stock</Label>
                  <Input
                    type="number"
                    id="stock_field"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label htmlFor="seller_field">Seller Name</Label>
                  <Input
                    type="text"
                    id="seller_field"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <p htmlFor="customFile">Images</p>

              <div className="custom-file">
                <input
                  type="file"
                  name="product_images"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChangeImage}
                  multiple
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Images
                </label>
              </div>

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
              className="py-3 text-white text-uppercase fw-bold"
              disabled={newProduct.loading ? true : false}
            >
              create new product
            </Button>
          </Form>
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
  addNewProduct: productActions.newReview,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
