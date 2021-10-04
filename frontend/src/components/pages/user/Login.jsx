import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { clearErrors } from "../../../actions/clearErrors";
import userActions from "../../../actions/userActions";
import LoginForm from "../../form/LoginForm";
import MetaData from "../../common/MetaData";
import { toast } from "react-toastify";

const Login = ({ history, location, clearErrors, login, auth }) => {
  const { isAuthenticated, error, loading } = auth;

  const [authenticatedData, setAuthenticatedData] = useState({
    email: "",
    password: "",
  });

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [isAuthenticated, error, history, redirect, clearErrors]);

  const handleChangeInput = (e) =>
    setAuthenticatedData({
      ...authenticatedData,
      [e.target.name]: e.target.value,
    });

  const submitHandler = (e) => {
    e.preventDefault();
    login(authenticatedData.email, authenticatedData.password);
  };

  return (
    <>
      <MetaData title={"Login"} />
      <LoginForm
        submitHandler={submitHandler}
        loading={loading}
        email={authenticatedData.email}
        password={authenticatedData.password}
        handleChangeInput={handleChangeInput}
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
