import React, { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
import ProductCardView from "../../common/ProductCardView";

const FilteredProducts = ({ title, filteredProducts }) => {
  const [productIndex, setProductIndex] = useState(0);

  //show 1st 4 images
  let firstFourProducts = filteredProducts.slice(
    productIndex,
    productIndex + 4
  );

  const nextProduct = () => {
    const nextIndex =
      productIndex === firstFourProducts.length ? 0 : productIndex + 1;
    setProductIndex(nextIndex);
  };
  const prevProduct = () => {
    const prevIndex =
      productIndex === 0 ? firstFourProducts.length - 1 : productIndex - 1;
    setProductIndex(prevIndex);
  };

  return (
    <div className="my-5">
      <Row>
        <Col>
          <h3>{title}</h3>
        </Col>
        <Col className="d-flex justify-content-end">
          <ButtonGroup>
            <Button color="secondary" onClick={prevProduct}>
              Prev
            </Button>
            <Button color="primary" onClick={nextProduct} className="ms-1">
              Next
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="d-flex">
          {firstFourProducts.map((product, index) => (
            <div
              key={index}
              className="me-5"
              style={{ width: "300px", height: "450px" }}
            >
              <ProductCardView product={product} />
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default FilteredProducts;
