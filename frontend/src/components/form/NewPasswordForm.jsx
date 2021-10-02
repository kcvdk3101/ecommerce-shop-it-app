import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import {
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import { clearErrors } from "../../actions/clearErrors";
import userActions from "../../actions/userActions";
import MetaData from "../layout/MetaData";

const NewPasswordForm = ({
  history,
  match,
  clearErrors,
  resetPassword,
  forgotPassword,
}) => {
  const { error, success, loading } = forgotPassword;

  const alert = useAlert();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearErrors();
    }

    if (success) {
      alert.success("Password updated successfully");
      history.push("/login");
    }
  }, [alert, error, success, history, clearErrors]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    //  match.params.token is reset password token
    resetPassword(match.params.token, formData);
  };

  return (
    <>
      <MetaData title={"New Password Reset"} />

      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={12} lg={5}>
          <Form onSubmit={submitHandler}>
            <h1 className="mb-3">New Password</h1>

            <FormGroup>
              <Label htmlFor="password_field">Password</Label>
              <Input
                type="password"
                id="password_field"
                value={password}
                disabled={loading ? true : false}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirm_password_field">Confirm Password</Label>
              <Input
                type="password"
                id="confirm_password_field"
                value={confirmPassword}
                disabled={loading ? true : false}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>

            <Button
              color="warning"
              block
              className="text-white py-2 text-uppercase"
              disabled={loading ? true : false}
            >
              {loading ? <Spinner color="light" /> : "Set Password"}
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

function mapStateToProps(state) {
  return {
    forgotPassword: state.forgotPassword,
  };
}

const mapDispatchToProps = {
  login: userActions.login,
  resetPassword: userActions.resetPassword,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordForm);
