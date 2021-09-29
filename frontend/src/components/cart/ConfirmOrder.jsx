import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = ({ history, auth, cart }) => {
  const { user } = auth;
  const { cartItems, shippingInfo } = cart;

  // Calculate Order Prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
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
    <>
      <MetaData title={"Confirm Order"} />

      <CheckoutSteps shipping confirmOrder />

      <Row className="d-flex justify-content-between">
        <Col xs={12} lg={8} className="order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user && user.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b>{" "}
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          {cartItems.map((item) => (
            <>
              <hr />
              <div className="text-muted my-5 px-3" key={item.product}>
                <Row>
                  <Col xs={4} lg={2}>
                    <img src={item.image} alt="Laptop" height="45" width="65" />
                  </Col>

                  <Col xs={5} lg={6}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col xs={4} lg={4} className="mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x ${item.price} ={" "}
                      <b>${(item.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </Col>
                </Row>
              </div>
              <hr />
            </>
          ))}
        </Col>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">${itemsPrice}</span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">${shippingPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">${taxPrice}</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">${totalPrice}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={processToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </Row>
    </>
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
