import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import { clearErrors } from "../../../actions/clearErrors";
import orderActions from "../../../actions/orderActions";
import Loader from "../../common/Loader";
import MetaData from "../../common/MetaData";

const OrderDetails = ({
  match,
  auth,
  orderDetails,
  getOrderDetails,
  clearErrors,
}) => {
  const { user } = auth;
  const { loading, error, order = {} } = orderDetails;
  const { shippingInfo, orderItems, paymentInfo, totalPrice, orderStatus } =
    order;

  useEffect(() => {
    getOrderDetails(match.params.id);
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [clearErrors, error, getOrderDetails, match.params.id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Container className="my-4">
      <MetaData title={"Order Details"} />

      {loading ? (
        <Loader />
      ) : (
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={8}>
            <ListGroup flush>
              <ListGroupItem>
                <h1 className="my-5">Order # {order._id}</h1>
                <h4 className="mb-4">Shipping Information</h4>
                <p>
                  <b>Name:</b> {user && user.firstName} {user && user.lastName}
                </p>
                <p>
                  <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
                </p>
                <p className="mb-4">
                  <b>Address:</b> {shippingDetails}
                </p>
                <p>
                  <b>Amount:</b> ${totalPrice}
                </p>
              </ListGroupItem>
              <ListGroupItem>
                <h4 className="my-4">Payment</h4>
                <p className={isPaid ? "text-success" : "text-danger"}>
                  <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                </p>
                <h4 className="my-4">Order Status:</h4>
                <p
                  className={
                    order.orderStatus &&
                    String(order.orderStatus).includes("Delivered")
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  <b>{orderStatus}</b>
                </p>
                <h4 className="my-4">Order Items:</h4>
              </ListGroupItem>
              <ListGroupItem>
                {orderItems &&
                  orderItems.map((item) => (
                    <Row
                      key={item.product}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Col xs={4} lg={2}>
                        <img src={item.image} alt={item.name} width="100%" />
                      </Col>

                      <Col xs={5} lg={5}>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>

                      <Col xs={4} lg={2} className="mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </Col>

                      <Col xs={4} lg={3} className="mt-4 mt-lg-0">
                        <p>{item.quantity} item(s)</p>
                      </Col>
                    </Row>
                  ))}
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {
    auth: state.auth,
    orderDetails: state.orderDetails,
    newOrder: state.newOrder,
  };
}

const mapDispatchToProps = {
  getOrderDetails: orderActions.getOrderDetails,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
