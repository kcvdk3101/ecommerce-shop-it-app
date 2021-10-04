import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import userActions from "../../actions/userActions";
import SearchInput from "../common/SearchInput";

const Header = ({ logout, auth, cart }) => {
  const { user, loading } = auth;
  const { cartItems } = cart;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const logoutHandler = () => {
    logout();
    toast.success("Logged out successfully.");
  };

  return (
    <Container fluid className="nav">
      <Container>
        <Row className="navbar">
          <Col xs={12} sm={12} md={3}>
            <Link to="/">
              <img src="/images/logo.png" alt="Logo" width="100" />
            </Link>
          </Col>
          <Col xs={12} sm={12} md={6}>
            {user && user.role === "admin" ? (
              <div className="w-100"></div>
            ) : (
              <Route
                render={({ history }) => <SearchInput history={history} />}
              />
            )}
          </Col>
          <Col xs={12} sm={12} md={3}>
            <div className="mt-4 mt-md-0 d-flex justify-content-end align-items-center">
              {user && user.role === "admin" ? (
                <div></div>
              ) : (
                <Link
                  to="/cart"
                  className="me-3 flex-shrink-0"
                  style={{ textDecoration: "none" }}
                >
                  <span className="text-white">
                    Cart
                    <span
                      className="ms-1 bg-warning py-1 px-2 rounded fw-bold fs-6"
                      id="cart_count"
                    >
                      {!cartItems ? 0 : cartItems.length}
                    </span>
                  </span>
                </Link>
              )}

              {user ? (
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle
                    className="d-flex justify-content-between align-items-center"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  >
                    <figure className="avatar">
                      <img
                        className="rounded-circle img-fluid"
                        src={user.avatar && user.avatar.url}
                        alt={user.firstName}
                      />
                    </figure>
                    <span className="ms-2">
                      {user.firstName} {user.lastName}
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className="w-100">
                    {user && user.role === "admin" && (
                      <DropdownItem>
                        <Link
                          to="/dashboard"
                          className="text-dark text-decoration-none"
                        >
                          Dashboard
                        </Link>
                      </DropdownItem>
                    )}
                    <DropdownItem>
                      <Link
                        to="/orders/me"
                        className="text-dark text-decoration-none"
                      >
                        My Orders
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/me" className="text-dark text-decoration-none">
                        Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem
                      className="text-dark text-decoration-none"
                      onClick={logoutHandler}
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                !loading && (
                  <Link to="/login" className="btn btn-warning text-white">
                    Login
                  </Link>
                )
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    cart: state.cart,
  };
}

const mapDispatchToProps = {
  logout: userActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
