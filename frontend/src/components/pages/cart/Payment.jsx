import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { clearErrors } from "../../../actions/clearErrors";
import orderActions from "../../../actions/orderActions";
import { config } from "../../../constant";
import MetaData from "../../common/MetaData";
import CheckoutSteps from "./CheckoutSteps";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = ({
  history,
  auth,
  cart,
  newOrder,
  createOrder,
  clearErrors,
}) => {
  const { user } = auth;
  const { cartItems, shippingInfo } = cart;
  const { error } = newOrder;

  const order = {
    orderItems: cartItems,
    shippingInfo,
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  };

  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get("/api/v1/stripeApi");
        setStripeApiKey(response.data.stripeApiKey);
      } catch (error) {
        console.log(error.message);
      }
    })();
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [clearErrors, error]);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      const clientSecret = response.data.client_secret;
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        // Check payment
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          createOrder(order);
          localStorage.setItem("cartItems", []);
          history.push("/success");
        } else {
          toast.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Container className="my-4">
            <MetaData title={"Payment"} />

            <CheckoutSteps shipping confirmOrder payment />

            <Row className="d-flex justify-content-center align-items-center">
              <Col xs={10} lg={5}>
                <Form onSubmit={submitHandler}>
                  <h1 className="mb-4">Card Information</h1>
                  <FormGroup>
                    <Label htmlFor="card_num_field">Card Number</Label>
                    <CardNumberElement
                      type="text"
                      id="card_num_field"
                      className="form-control"
                      options={options}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="card_exp_field">Card Expiry</Label>
                    <CardExpiryElement
                      type="text"
                      id="card_exp_field"
                      className="form-control"
                      options={options}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="card_cvc_field">Card CVC</Label>
                    <CardCvcElement
                      type="text"
                      id="card_cvc_field"
                      className="form-control"
                      options={options}
                    />
                  </FormGroup>

                  <Button
                    block
                    color="warning"
                    className="py-2 text-white"
                    disabled={loading ? true : false}
                  >
                    Pay {` - ${orderInfo && orderInfo.totalPrice}`}
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Elements>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    cart: state.cart,
    newOrder: state.newOrder,
  };
}

const mapDispatchToProps = {
  createOrder: orderActions.createOrder,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
