import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import convertToDateString from "../../../utils/convertToDateString";
import Loader from "../../common/Loader";
import MetaData from "../../common/MetaData";

const Profile = ({ auth }) => {
  const { user, loading } = auth;
  return (
    <Container className="my-4">
      <MetaData title={"Your Profile"} />
      <h1 className="mb-3" style={{ fontFamily: "'Pacifico', cursive" }}>
        My Profile
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <Row className="justify-content-around mt-5">
          <Col xs={12} md={6} className="d-flex flex-column align-items-center">
            <figure className="avatar-profile">
              <img
                className="rounded-circle w-100"
                src={user.avatar.url}
                alt={user.firstName}
              />
            </figure>
            <Link
              to="/me/update"
              id="edit_profile"
              className="btn btn-warning text-white"
            >
              Edit Profile
            </Link>
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column justify-content-between"
          >
            <Row
              className="d-flex flex-column justify-content-between"
              style={{ height: "100%" }}
            >
              <Col xs={12}>
                <div className="mb-4">
                  <h3>Full Name</h3>
                  <h5>
                    {user.firstName} {user.lastName}
                  </h5>
                </div>
                <div className="mb-4">
                  <h3>Email Address</h3>
                  <h5>{user.email}</h5>
                </div>
                <div>
                  <h3>Join on</h3>
                  <h5>{convertToDateString(user.createdAt)}</h5>
                </div>
              </Col>
              <Col xs={12}>
                <Button color="danger" className="me-2">
                  <Link
                    to="/orders/me"
                    className="text-white text-decoration-none"
                  >
                    My orders
                  </Link>
                </Button>

                <Button color="primary">
                  <Link
                    to="/password/update"
                    className="text-white text-decoration-none"
                  >
                    Change Password
                  </Link>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
