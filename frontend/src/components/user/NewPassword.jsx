import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/clearErrors";
import userActions from "../../actions/userActions";
import MetaData from "../layout/MetaData";

const NewPassword = ({
  history,
  match,
  clearErrors,
  resetPassword,
  forgotPassword,
}) => {
  const { error, success } = forgotPassword;

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

    resetPassword(match.params.token, formData);
  };

  return (
    <Fragment>
      <MetaData title={"New Password Reset"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">New Password</h1>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    forgotPassword: state.forgotPassword,
    auth: state.auth,
  };
}

const mapDispatchToProps = {
  login: userActions.login,
  resetPassword: userActions.resetPassword,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
