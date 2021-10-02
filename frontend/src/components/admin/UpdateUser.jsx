import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux";
import { clearErrors } from "../../actions/clearErrors";
import userActions from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const UpdateUser = ({
  history,
  match,
  userDB,
  userDetails,
  clearErrors,
  getUserDetails,
  updateUser,
}) => {
  const userId = match.params.id;

  const { error, isUpdated } = userDB;
  const { user } = userDetails;

  const alert = useAlert();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user && user._id !== userId) {
      getUserDetails(userId);
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      clearErrors();
    }

    if (isUpdated) {
      alert.success("User updated successfully");

      history.push("/admin/users");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    userId,
    user,
    getUserDetails,
    clearErrors,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("email", email);
    formData.set("role", role);

    updateUser(user._id, formData);
  };

  return (
    <>
      <MetaData title={`Update User`} />
      <Row>
        <Col xs={12} md={2}>
          <Sidebar />
        </Col>

        <Col xs={12} md={10}>
          <Form onSubmit={submitHandler}>
            <h1 className="mt-5">Update User</h1>

            <Row form>
              <Col xs={6}>
                <FormGroup>
                  <Label htmlFor="firstName_field">First Name</Label>
                  <Input
                    type="text"
                    id="firstName_field"
                    className="form-control"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <Label htmlFor="lastName_field">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName_field"
                    className="form-control"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col xs={6}>
                <FormGroup>
                  <Label htmlFor="email_field">Email</Label>
                  <Input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup>
                  <Label htmlFor="role_field">Role</Label>
                  <Input
                    type="select"
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <Button color="warning" className="text-white">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

function mapStateToProps(state) {
  return {
    userDB: state.user,
    userDetails: state.userDetails,
  };
}

const mapDispatchToProps = {
  getUserDetails: userActions.getUserDetails,
  updateUser: userActions.updateUser,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
