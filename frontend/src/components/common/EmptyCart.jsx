import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

const EmptyCart = () => {
  return (
    <Row
      className="justify-content-center align-items-center text-center"
      style={{ minHeight: "70vh" }}
    >
      <Col xs={7}>
        <img src="./images/empty_cart.png" alt="Empty Cart" />
        <h2>Your Cart is empty</h2>
        <Link to="/" className="text-warning">
          Let go for shopping
        </Link>
      </Col>
    </Row>
  );
};

export default EmptyCart;
