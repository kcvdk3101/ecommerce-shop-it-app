// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import userActions from "./actions/userActions";
// Cart Imports
import Cart from "./components/cart/Cart";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import OrderSuccess from "./components/cart/OrderSuccess";
import Payment from "./components/cart/Payment";
import Shipping from "./components/cart/Shipping";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
// Order Imports
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import ProductDetails from "./components/product/ProductDetails";
// Admin Imports
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Search from "./components/search/Search";
import ForgotPassword from "./components/user/ForgotPassword";
// Auth or User imports
import Login from "./components/user/Login";
import NewPassword from "./components/user/NewPassword";
import Profile from "./components/user/Profile";
import Register from "./components/user/Register";
import UpdatePassword from "./components/user/UpdatePassword";
import UpdateProfile from "./components/user/UpdateProfile";

function App({ auth, loadUser }) {
  const { user, isAuthenticated, loading } = auth;
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    // store.dispatch(loadUser());
    loadUser();

    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, [loadUser]);

  return (
    <>
      <Header />
      <Container className="my-5">
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Search} />
        <Route path="/product/:id" component={ProductDetails} exact />

        <Route path="/cart" component={Cart} exact />
        <ProtectedRoute path="/shipping" component={Shipping} />
        <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
        <ProtectedRoute path="/success" component={OrderSuccess} />
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/payment" component={Payment} />
          </Elements>
        )}

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/password/forgot" component={ForgotPassword} exact />
        <Route path="/password/reset/:token" component={NewPassword} exact />
        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
        <ProtectedRoute
          path="/password/update"
          component={UpdatePassword}
          exact
        />

        <ProtectedRoute path="/orders/me" component={ListOrders} exact />
        <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
      </Container>

      <ProtectedRoute
        path="/dashboard"
        isAdmin={true}
        component={Dashboard}
        exact
      />
      <ProtectedRoute
        path="/admin/products"
        isAdmin={true}
        component={ProductsList}
        exact
      />
      <ProtectedRoute
        path="/admin/product"
        isAdmin={true}
        component={NewProduct}
        exact
      />
      <ProtectedRoute
        path="/admin/product/:id"
        isAdmin={true}
        component={UpdateProduct}
        exact
      />
      <ProtectedRoute
        path="/admin/orders"
        isAdmin={true}
        component={OrdersList}
        exact
      />
      <ProtectedRoute
        path="/admin/order/:id"
        isAdmin={true}
        component={ProcessOrder}
        exact
      />
      <ProtectedRoute
        path="/admin/users"
        isAdmin={true}
        component={UsersList}
        exact
      />
      <ProtectedRoute
        path="/admin/user/:id"
        isAdmin={true}
        component={UpdateUser}
        exact
      />
      <ProtectedRoute
        path="/admin/reviews"
        isAdmin={true}
        component={ProductReviews}
        exact
      />

      {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}
    </>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

const mapDispatchToProps = {
  loadUser: userActions.loadUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
