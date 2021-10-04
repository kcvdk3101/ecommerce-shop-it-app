import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import orderActions from "../../actions/orderActions";
import productActions from "../../actions/productActions";
import userActions from "../../actions/userActions";
import Loader from "../common/Loader";
import MetaData from "../common/MetaData";
import Sidebar from "./Sidebar";
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardFooter,
} from "reactstrap";

const Dashboard = ({
  products,
  allUsers,
  allOrders,
  getAdminProducts,
  getAllOrders,
  getAllUsers,
}) => {
  const { users } = allUsers;
  const { orders, totalAmount, loading } = allOrders;

  useEffect(() => {
    (async function () {
      return Promise.all[(getAdminProducts(), getAllOrders(), getAllUsers())];
    })();
  }, [getAdminProducts, getAllOrders, getAllUsers]);

  let outOfStock = 0;
  products.products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  return (
    <Row>
      <Col xs={12} md={2}>
        <Sidebar />
      </Col>

      <Col xs={12} md={10} className="py-2">
        <h1>Dashboard</h1>

        {loading ? (
          <Loader />
        ) : (
          <>
            <MetaData title={"Admin Dashboard"} />

            <Row className="pr-4">
              <Col xs={12} className="mb-3">
                <Card className="bg-primary o-hidden h-100">
                  <CardBody className="text-center text-white">
                    <CardTitle tag="h3">Total Amount</CardTitle>
                    <CardText tag="h4">
                      ${totalAmount && totalAmount.toFixed(2)}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row className="pr-4">
              <Col xs={12} sm={6} xl={3} className="mb-3">
                <Card className="bg-success o-hidden h-100">
                  <CardBody className="text-center text-white">
                    <CardTitle tag="h3">Products</CardTitle>
                    <CardText tag="h4">
                      {products.products && products.products.length}
                    </CardText>
                  </CardBody>
                  <CardFooter>
                    <Link className="text-white" to="/admin/products">
                      <span className="float-start">View Details</span>
                      <span className="float-end">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </CardFooter>
                </Card>
              </Col>

              <Col xs={12} sm={6} xl={3} className="mb-3">
                <Card className="bg-danger o-hidden h-100">
                  <CardBody className="text-center text-white">
                    <CardTitle tag="h3">Orders</CardTitle>
                    <CardText tag="h4">{orders && orders.length}</CardText>
                  </CardBody>
                  <CardFooter>
                    <Link className="text-white" to="/admin/orders">
                      <span className="float-start">View Details</span>
                      <span className="float-end">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </CardFooter>
                </Card>
              </Col>

              <Col xs={12} sm={6} xl={3} className="mb-3">
                <Card className="bg-info o-hidden h-100">
                  <CardBody className="text-center text-white">
                    <CardTitle tag="h3">Users</CardTitle>
                    <CardText tag="h4">{users && users.length}</CardText>
                  </CardBody>
                  <CardFooter>
                    <Link className="text-white" to="/admin/users">
                      <span className="float-start">View Details</span>
                      <span className="float-end">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </CardFooter>
                </Card>
              </Col>

              <Col xs={12} sm={6} xl={3} className="mb-3">
                <Card className="bg-warning o-hidden h-100">
                  <CardBody className="text-center text-white">
                    <CardTitle tag="h3">Out of Stock</CardTitle>
                    <CardText tag="h4">{outOfStock}</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    products: state.products,
    allUsers: state.allUsers,
    allOrders: state.allOrders,
  };
}

const mapDispatchToProps = {
  getAdminProducts: productActions.getAdminProducts,
  getAllOrders: orderActions.allOrders,
  getAllUsers: userActions.allUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
