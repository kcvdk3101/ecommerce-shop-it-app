import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/clearErrors";
import userActions from "../../actions/userActions";
import putFormDataInRegister from "../../utils/putFormDataInRegister";
import RegisterForm from "../form/RegisterForm";
import MetaData from "../layout/MetaData";

const Register = ({ history, clearErrors, auth, register }) => {
  const { isAuthenticated, error, loading } = auth;
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = user;

  const [avatar, setAvatar] = useState("/images/avatars_default.png");

  const alert = useAlert();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
      alert.success("Register successfully !");
    }

    if (error) {
      alert.error(error);
      clearErrors();
    }
  }, [alert, isAuthenticated, error, history, clearErrors]);

  const handleChangeInput = (name, changedInput) => {
    setUser((prev) => ({ ...prev, [name]: changedInput }));
  };

  const onAvatarChange = (e) => {
    if (e.target.name !== "avatar") return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState !== 2) return;
      setAvatar(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    register(
      putFormDataInRegister(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        avatar
      )
    );
  };

  return (
    <>
      <MetaData title={"Register User"} />
      <RegisterForm
        submitHandler={submitHandler}
        loading={loading}
        avatar={avatar}
        onAvatarChange={onAvatarChange}
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
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
  register: userActions.register,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
