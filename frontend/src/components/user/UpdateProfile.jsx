import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { clearErrors } from "../../actions/clearErrors";
import userActions from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import putFormDataInUpdateProfile from "../../utils/putFormDataInUpdateProfile";
import UpdateProfileForm from "../form/UpdateProfileForm";
import MetaData from "../layout/MetaData";

const UpdateProfile = ({
  history,
  clearErrors,
  loadUser,
  updateProfile,
  userUpdate,
  auth,
}) => {
  const { user } = auth;
  const { error, isUpdated, loading } = userUpdate;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAvatar(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      clearErrors();
    }
    if (isUpdated) {
      alert.success("User updated successfully");
      loadUser();
      history.push("/me");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated, user, clearErrors, loadUser]);

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
    updateProfile(
      putFormDataInUpdateProfile(firstName, lastName, email, avatar)
    );
  };
  return (
    <Container className="my-4">
      <MetaData title={"Update Profile"} />
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={12} lg={5}>
          <UpdateProfileForm
            loading={loading}
            submitHandler={submitHandler}
            avatar={avatar}
            onAvatarChange={onAvatarChange}
            firstName={firstName}
            lastName={lastName}
            email={email}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
          />
        </Col>
      </Row>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    userUpdate: state.user,
    auth: state.auth,
  };
}

const mapDispatchToProps = {
  loadUser: userActions.loadUser,
  updateProfile: userActions.updateProfile,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
