import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  FormGroup,
  Input,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { UPDATE_ORDER_RESET } from "../../actions/actionTypes/orderActionTypes";
import { clearErrors } from "../../actions/clearErrors";
import orderActions from "../../actions/orderActions";
import { STATUS_ORDER } from "../../constant";
import Loader from "../common/Loader";
import MetaData from "../common/MetaData";
import Sidebar from "./Sidebar";

const ProcessOrder = ({
  match,
  orderDB,
  orderDetails,
  getOrderDetails,
  updateOrder,
  clearErrors,
}) => {
  const orderId = match.params.id;
  const { loading, order = {} } = orderDetails;
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    getOrderDetails(orderId);

    if (orderDB.error) {
      toast.error(orderDB.error);
      clearErrors();
    }

    if (orderDB.isUpdated) {
      toast.success("Order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, orderDB, orderId, getOrderDetails, clearErrors]);

  const updateOrderHandler = (id) => {
    const formData = new FormData();
    formData.set("status", status);
    updateOrder(id, formData);
  };

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`;
  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <>
      <MetaData title={`Process Order # ${order && order._id}`} />
      <Row>
        <Col xs={12} md={2}>
          <Sidebar />
        </Col>

        <Col xs={12} md={10}>
          {loading ? (
            <Loader />
          ) : (
            <Row className="d-flex justify-content-around my-5">
              <Col xs={12} lg={7}>
                <h1>Order #{order._id}</h1>
                <ListGroup flush>
                  <ListGroupItem>
                    <h4 className="mb-4">Shipping Information</h4>
                    <p>
                      <b>Name:</b> {user && user.firstName}{" "}
                      {user && user.lastName}
                    </p>
                    <p>
                      <b>Phone:</b> {shippingInfo && shippingInfo.phoneNumber}
                    </p>
                    <p>
                      <b>Address: </b>
                      {shippingDetails}
                    </p>
                    <p>
                      <b>Amount:</b> ${totalPrice}
                    </p>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4 className="my-4">Payment</h4>
                    <p
                      className={`fs-5 ${
                        isPaid ? "text-success" : "text-danger"
                      }`}
                    >
                      <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                    </p>

                    <h4 className="my-4">Stripe ID</h4>
                    <p className="text-muted">
                      <b>{paymentInfo && paymentInfo.id}</b>
                    </p>

                    <h4 className="my-4">Order Status:</h4>
                    <p
                      className={`fs-5 ${
                        order.orderStatus &&
                        String(order.orderStatus).includes("Delivered")
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      <b>{orderStatus}</b>
                    </p>
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4 className="my-4">Order Items:</h4>
                    <ListGroup flush>
                      {orderItems &&
                        orderItems.map((item) => (
                          <ListGroupItem key={item.product}>
                            <Row className="justify-content-center align-items-center">
                              <Col xs={4} lg={2}>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  width="100%"
                                />
                              </Col>

                              <Col xs={5} lg={5}>
                                <p>
                                  <b>{item.name}</b>
                                </p>
                              </Col>

                              <Col xs={4} lg={2} className="mt-4 mt-lg-0">
                                <p>
                                  <b>${item.price}</b>
                                </p>
                              </Col>

                              <Col xs={4} lg={3} className="mt-4 mt-lg-0">
                                <p>
                                  <b>{item.quantity}</b> Piece(s)
                                </p>
                              </Col>
                            </Row>
                          </ListGroupItem>
                        ))}
                    </ListGroup>
                  </ListGroupItem>
                </ListGroup>
              </Col>

              <Col xs={12} lg={3}>
                <h4>Status</h4>

                <FormGroup>
                  <Input
                    type="select"
                    className="form-control"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {STATUS_ORDER.map((s, i) => (
                      <option key={i} value={s}>
                        {s}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <Button
                  color="warning"
                  block
                  className="text-white text-uppercase"
                  onClick={() => updateOrderHandler(order._id)}
                >
                  Update Status
                </Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

function mapStateToProps(state) {
  return {
    orderDB: state.order,
    orderDetails: state.orderDetails,
    allOrders: state.allOrders,
  };
}

const mapDispatchToProps = {
  clearErrors: clearErrors,
  getOrderDetails: orderActions.getOrderDetails,
  updateOrder: orderActions.updateOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessOrder);
