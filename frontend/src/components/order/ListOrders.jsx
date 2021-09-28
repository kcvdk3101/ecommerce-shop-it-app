import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors } from "../../actions/clearErrors";
import orderActions from "../../actions/orderActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const ListOrders = ({ myOrders, getMyOrders, clearErrors }) => {
  const { loading, error, orders } = myOrders;

  const alert = useAlert();

  useEffect(() => {
    getMyOrders();

    if (error) {
      alert.error(error);
      clearErrors();
    }
  }, [alert, error, getMyOrders, clearErrors]);

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
          label: "Actions",
          field: "actions",
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
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"My Orders"} />

      <h1 className="my-5">My Orders</h1>

      {loading ? (
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
    </Fragment>
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
