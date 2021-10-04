import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import MetaData from "../../common/MetaData";

const OrderSuccess = () => {
  return (
    <Container className="my-4">
      <MetaData title={"Order Success"} />
      <Row className="d-flex justify-content-center align-items-center text-center">
        <Col xs={5}>
          <img
            className="my-5 img-fluid mx-auto"
            src="/images/order_success.png"
            alt="Order Success"
            width="200"
            height="200"
          />
          <h2>Your Order has been placed successfully.</h2>
          <Link to="/orders/me">Go to Orders</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSuccess;
