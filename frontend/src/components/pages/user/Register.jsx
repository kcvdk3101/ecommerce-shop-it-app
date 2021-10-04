import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../../../actions/clearErrors";
import userActions from "../../../actions/userActions";
import putFormDataInRegister from "../../../utils/putFormDataInRegister";
import MetaData from "../../common/MetaData";
import RegisterForm from "../../form/RegisterForm";

const Register = ({ history, clearErrors, auth, register }) => {
  const { isAuthenticated, error, loading } = auth;
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState("/images/avatars_default.png");

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Register successfully !");
      history.push("/");
    }
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [isAuthenticated, error, history, clearErrors]);

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
    register(putFormDataInRegister(user, avatar));
  };

  return (
    <>
      <MetaData title={"Register User"} />
      <RegisterForm
        submitHandler={submitHandler}
        loading={loading}
        avatar={avatar}
        onAvatarChange={onAvatarChange}
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        password={user.password}
        confirmPassword={user.confirmPassword}
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
