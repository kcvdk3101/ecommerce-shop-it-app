import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import MetaData from "../../common/MetaData";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = ({ history, auth, cart }) => {
  const { user } = auth;
  const { cartItems, shippingInfo } = cart;

  // Calculate Order Prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 20 : 30;
  // Tax 5%
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/payment");
  };

  return (
    <Container>
      <MetaData title={"Confirm Order"} />

      <CheckoutSteps shipping confirmOrder />

      <Row className="d-flex justify-content-between">
        <Col xs={12} lg={8}>
          <h3 className="mb-3">Shipping Information</h3>
          <p>
            <b>Name:</b> {user.firstName} {user.lastName}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phoneNumber}
          </p>
          <p>
            <b>Address:</b>{" "}
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`}
          </p>

          <ListGroup flush className="my-5">
            {cartItems.map((cartItem, index) => (
              <ListGroupItem key={index} className="my-1">
                <Row className="justify-content-center align-items-center">
                  <Col xs={4} lg={2}>
                    <img src={cartItem.image} alt="Laptop" width="100%" />
                  </Col>

                  <Col xs={5} lg={6}>
                    <p className="fw-bold fs-5">{cartItem.name}</p>
                  </Col>

                  <Col xs={4} lg={4} className="mt-4 mt-lg-0">
                    <p>
                      {cartItem.quantity} x ${cartItem.price} ={" "}
                      <b>${(cartItem.quantity * cartItem.price).toFixed(2)}</b>
                    </p>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>

        <Col xs={12} lg={3} className="my-4">
          <ListGroup flush className="border py-4 px-4 rounded-3">
            <ListGroupItem>
              <h4>Order Summary</h4>
            </ListGroupItem>
            <ListGroupItem>
              <p>
                Subtotal: <b>${itemsPrice}</b>
              </p>
              <p>
                Shipping: <b>${shippingPrice}</b>
              </p>
              <p>
                Tax: <b>${taxPrice}</b>
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <p>
                Total: <b>${totalPrice}</b>
              </p>
              <Button
                color="warning"
                block
                className="text-white py-2"
                onClick={processToPayment}
              >
                Proceed to Payment
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    cart: state.cart,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder);
