import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors } from "../../actions/clearErrors";
import orderActions from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { Row, Col } from "reactstrap";

const OrdersList = ({
  history,
  order,
  allOrders,
  getAllOrders,
  deleteOrder,
  clearErrors,
}) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllOrders();

    if (allOrders.error) {
      alert.error(allOrders.error);
      clearErrors();
    }

    if (order.isDeleted) {
      alert.success("Order deleted successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [
    dispatch,
    alert,
    order,
    history,
    getAllOrders,
    clearErrors,
    allOrders.error,
  ]);

  const deleteOrderHandler = (id) => {
    deleteOrder(id);
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Number of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    allOrders.orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Fragment>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteOrderHandler(order._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title={"All Orders"} />
      <Row>
        <Col xs={12} md={2}>
          <Sidebar />
        </Col>

        <Col xs={12} md={10}>
          <h1 className="mt-5">All Orders</h1>

          {allOrders.loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setOrders()}
              className="px-3"
              bordered
              striped
              hover
            />
          )}
        </Col>
      </Row>
    </>
  );
};

function mapStateToProps(state) {
  return {
    order: state.order,
    allOrders: state.allOrders,
  };
}

const mapDispatchToProps = {
  clearErrors: clearErrors,
  getAllOrders: orderActions.allOrders,
  deleteOrder: orderActions.deleteOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);
