import { MDBDataTable } from "mdbreact";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Container } from "reactstrap";
import { clearErrors } from "../../../actions/clearErrors";
import orderActions from "../../../actions/orderActions";
import Loader from "../../common/Loader";
import MetaData from "../../common/MetaData";

const ListOrders = ({ myOrders, getMyOrders, clearErrors }) => {
  const { loading, error, orders } = myOrders;

  useEffect(() => {
    getMyOrders();
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, getMyOrders, clearErrors]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
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
          label: "Details",
          field: "details",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
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
        details: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Container className="my-4">
      <MetaData title={"My Orders"} />

      <h1 className="mb-3">My Orders</h1>

      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable data={setOrders()} bordered striped hover />
      )}
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    myOrders: state.myOrders,
  };
}

const mapDispatchToProps = {
  getMyOrders: orderActions.myOrders,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOrders);
