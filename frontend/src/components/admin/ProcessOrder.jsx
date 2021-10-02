import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors } from "../../actions/clearErrors";
import orderActions from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import {
  Row,
  Col,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Input,
} from "reactstrap";
import { STATUS_ORDER } from "../../constant";

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

  console.log(order);

  const alert = useAlert();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    getOrderDetails(orderId);

    if (orderDB.error) {
      alert.error(orderDB.error);
      clearErrors();
    }

    if (orderDB.isUpdated) {
      alert.success("Order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, alert, orderDB, orderId, getOrderDetails, clearErrors]);

  const updateOrderHandler = (id) => {
    const formData = new FormData();
    formData.set("status", status);
    updateOrder(id, formData);
  };

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
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
            <Row className="d-flex justify-content-around">
              <Col xs={12} lg={7} className="order-details">
                <h1 className="mt-5">Order # {order._id}</h1>
                <ListGroup flush>
                  <ListGroupItem>
                    <h4 className="mb-4">Shipping Info</h4>
                    <p>
                      <b>Name:</b> {user && user.firstName}{" "}
                      {user && user.lastName}
                    </p>
                    <p>
                      <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
                    </p>
                    <p>
                      <b>Address:</b>
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
                    <p>
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
                    <div>
                      {orderItems &&
                        orderItems.map((item) => (
                          <Row
                            key={item.product}
                            className="justify-content-center align-items-center"
                          >
                            <Col xs={4} lg={2}>
                              <img
                                src={item.image}
                                alt={item.name}
                                width="100%"
                              />
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
                              <p>{item.quantity} Piece(s)</p>
                            </Col>
                          </Row>
                        ))}
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </Col>

              <Col xs={12} lg={3}>
                <h4 className="mt-5">Status</h4>

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

                <button
                  className="btn btn-primary btn-block"
                  onClick={() => updateOrderHandler(order._id)}
                >
                  Update Status
                </button>
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
