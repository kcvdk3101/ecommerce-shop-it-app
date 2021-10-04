import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { UPDATE_USER_RESET } from "../../actions/actionTypes/userActionTypes";
import { clearErrors } from "../../actions/clearErrors";
import userActions from "../../actions/userActions";
import MetaData from "../common/MetaData";
import Sidebar from "./Sidebar";

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
  const { user } = userDetails;

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
    if (userDB.error) {
      toast.error(userDB.error);
      clearErrors();
    }
    if (userDB.isUpdated) {
      toast.success("User updated successfully");

      history.push("/admin/users");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, userDB, history, userId, user, getUserDetails, clearErrors]);

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
          <Row className="justify-content-center">
            <Col xs={7}>
              <Form onSubmit={submitHandler}>
                <h1 className="my-5">Update User</h1>

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

                <Button color="warning" block className="text-white">
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
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
