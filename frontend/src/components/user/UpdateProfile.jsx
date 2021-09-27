import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux";
import { clearErrors } from "../../actions/clearErrors";
import userActions from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
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
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
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

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("email", email);
    formData.set("avatar", avatar);

    updateProfile(formData);
  };
  return (
    <Fragment>
      <MetaData title={"Update Profile"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">First Name</label>
              <input
                type="text"
                id="firstName_field"
                className="form-control"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="lastName_field"
                className="form-control"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
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
