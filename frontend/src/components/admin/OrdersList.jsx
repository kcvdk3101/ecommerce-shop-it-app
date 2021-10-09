import { MDBDataTable } from "mdbreact";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import { DELETE_ORDER_RESET } from "../../actions/actionTypes/orderActionTypes";
import { clearErrors } from "../../actions/clearErrors";
import orderActions from "../../actions/orderActions";
import Loader from "../common/Loader";
import MetaData from "../common/MetaData";
import Sidebar from "./Sidebar";

const OrdersList = ({
  history,
  order,
  allOrders,
  getAllOrders,
  deleteOrder,
  clearErrors,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllOrders();
    if (allOrders.error) {
      toast.error(allOrders.error);
      clearErrors();
    }
    if (order.isDeleted) {
      toast.success("Order deleted successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, order, history, getAllOrders, clearErrors, allOrders.error]);

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
          <>
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
          </>
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
