import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/clearErrors";
import userActions from "../../actions/userActions";
import LoginForm from "../form/LoginForm";
import MetaData from "../layout/MetaData";

const Login = ({ history, location, clearErrors, login, auth }) => {
  const { isAuthenticated, error, loading } = auth;

  const alert = useAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }

    if (error) {
      alert.error(error);
      clearErrors();
    }
  }, [alert, isAuthenticated, error, history, redirect, clearErrors]);

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <MetaData title={"Login"} />
      <LoginForm
        submitHandler={submitHandler}
        loading={loading}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </>
  );
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

const mapDispatchToProps = {
  login: userActions.login,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
