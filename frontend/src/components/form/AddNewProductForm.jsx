import React from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { CATEGORIES } from "../../constant";

const AddNewProductForm = ({
  newProduct,
  name,
  brand,
  price,
  description,
  category,
  stock,
  seller,
  imagesPreview,
  setName,
  setBrand,
  setPrice,
  setDescription,
  setCategory,
  setStock,
  setSeller,
  onChangeImage,
  submitHandler,
}) => {
  const isLoading = newProduct.loading ? true : false;

  return (
    <Form
      onSubmit={submitHandler}
      encType="multipart/form-data"
      className="p-3"
    >
      <h1>New Product</h1>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label htmlFor="name_field">Name</Label>
            <Input
              type="text"
              id="name_field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label htmlFor="brand_field">Brand</Label>
            <Input
              type="text"
              id="brand_field"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              disabled={isLoading}
              required
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label htmlFor="price_field">Price</Label>
            <Input
              min="1"
              type="number"
              id="price_field"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={isLoading}
              required
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
          disabled={isLoading}
          required
        />
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
              disabled={isLoading}
              required
            >
              <option>Choose type of category</option>
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
              min="0"
              type="number"
              id="stock_field"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              disabled={isLoading}
              required
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
              disabled={isLoading}
              required
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
            disabled={isLoading}
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
            width="150"
          />
        ))}
      </FormGroup>

      <Button
        color="warning"
        block
        className="py-3 text-white text-uppercase fw-bold"
        disabled={newProduct.loading ? true : false}
      >
        {newProduct.loading ? <Spinner /> : "create new product"}
      </Button>
    </Form>
  );
};

export default AddNewProductForm;
