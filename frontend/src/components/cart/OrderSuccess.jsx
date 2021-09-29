import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
  return (
    <>
      <MetaData title={"Order Success"} />

      <Row className="d-flex justify-content-center">
        <Col xs={6}>
          <Card>
            <CardImg
              top
              src="/images/order_success.png"
              alt="Order Success"
              width="200"
              height="200"
            />
            <CardBody>
              <CardTitle tag="h5">
                Your Order has been placed successfully.
              </CardTitle>
              <Button>
                <Link to="/orders/me">Go to Orders</Link>
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderSuccess;
