import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import { UPDATE_PROFILE_RESET } from "../../../actions/actionTypes/userActionTypes";
import { clearErrors } from "../../../actions/clearErrors";
import userActions from "../../../actions/userActions";
import putFormDataInUpdateProfile from "../../../utils/putFormDataInUpdateProfile";
import MetaData from "../../common/MetaData";
import UpdateProfileForm from "../../form/UpdateProfileForm";

const UpdateProfile = ({
  history,
  clearErrors,
  loadUser,
  updateProfile,
  userUpdate,
  auth,
}) => {
  const { user } = auth;
  const { loading } = userUpdate;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAvatar(user.avatar.url);
    }
    if (userUpdate.error) {
      toast.error(userUpdate.error);
      clearErrors();
    }
    if (userUpdate.isUpdated) {
      toast.success("User updated successfully");
      loadUser();
      history.push("/me");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, userUpdate, history, user, clearErrors, loadUser]);

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
      <Row className="justify-content-center">
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
