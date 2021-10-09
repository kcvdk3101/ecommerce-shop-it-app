import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "reactstrap";
import { clearErrors } from "./actions/clearErrors";
import userActions from "./actions/userActions";
import AddNewProduct from "./components/admin/AddNewProduct";
import Dashboard from "./components/admin/Dashboard";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import ProductReviews from "./components/admin/ProductReviews";
import ProductsList from "./components/admin/ProductsList";
import UpdateProduct from "./components/admin/UpdateProduct";
import UpdateUser from "./components/admin/UpdateUser";
import UsersList from "./components/admin/UsersList";
import ProtectedRoute from "./components/common/ProtectedRoute";
import NewPasswordForm from "./components/form/NewPasswordForm";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Cart from "./components/pages/cart/Cart";
import ConfirmOrder from "./components/pages/cart/ConfirmOrder";
import OrderSuccess from "./components/pages/cart/OrderSuccess";
import Payment from "./components/pages/cart/Payment";
import Shipping from "./components/pages/cart/Shipping";
import Home from "./components/pages/home/Home";
import ListOrders from "./components/pages/order/ListOrders";
import OrderDetails from "./components/pages/order/OrderDetails";
import Search from "./components/pages/search/Search";
import Login from "./components/pages/user/Login";
import Profile from "./components/pages/user/Profile";
import Register from "./components/pages/user/Register";
import UpdatePassword from "./components/pages/user/UpdatePassword";
import UpdateProfile from "./components/pages/user/UpdateProfile";
import ProductDetails from "./components/product/details/ProductDetails";

function App({ auth, loadUser, clearErrors }) {
  const { user, isAuthenticated, loading } = auth;

  useEffect(() => {
    loadUser();
    return () => {
      clearErrors();
    };
  }, [clearErrors, loadUser]);

  return (
    <>
      <Header />

      <Container fluid>
        <Route path="/" exact>
          {user && user.role === "admin" ? (
            <Redirect to="/dashboard" />
          ) : (
            <Home />
          )}
        </Route>
        <Route path="/search/:keyword" component={Search} />
        <Route path="/product/:id" component={ProductDetails} exact />

        <Route path="/cart" component={Cart} exact />
        <ProtectedRoute path="/shipping" component={Shipping} />
        <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
        <ProtectedRoute path="/success" component={OrderSuccess} />
        <ProtectedRoute path="/payment" component={Payment} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route
          path="/password/reset/:token"
          component={NewPasswordForm}
          exact
        />
        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
        <ProtectedRoute
          path="/password/update"
          component={UpdatePassword}
          exact
        />

        <ProtectedRoute path="/orders/me" component={ListOrders} exact />
        <ProtectedRoute path="/order/:id" component={OrderDetails} exact />

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
          component={AddNewProduct}
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
      </Container>

      {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
