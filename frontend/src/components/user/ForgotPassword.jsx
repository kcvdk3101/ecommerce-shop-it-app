import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/clearErrors";
import userActions from "../../actions/userActions";
import MetaData from "../layout/MetaData";

const ForgotPassword = ({
  clearErrors,
  forgotPassword,
  forgotUserPassword,
}) => {
  const { error, loading, message } = forgotPassword;

  const alert = useAlert();

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearErrors();
    }

    if (message) {
      alert.success(message);
    }
  }, [error, message, clearErrors, alert]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);

    forgotUserPassword(formData);
  };

  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    forgotPassword: state.forgotPassword,
  };
}

const mapDispatchToProps = {
  loadUser: userActions.loadUser,
  clearErrors: clearErrors,
  forgotUserPassword: userActions.forgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
