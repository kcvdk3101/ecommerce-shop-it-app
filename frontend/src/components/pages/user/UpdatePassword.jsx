import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { UPDATE_PASSWORD_RESET } from "../../../actions/actionTypes/userActionTypes";
import { clearErrors } from "../../../actions/clearErrors";
import userActions from "../../../actions/userActions";
import putFormDataInUpdatePassword from "../../../utils/putFormDataInUpdatePassword";
import MetaData from "../../common/MetaData";

const UpdatePassword = ({ user, history, clearErrors, updatePassword }) => {
  const { loading } = user;
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user.error) {
      toast.error(user.error);
      clearErrors();
    }
    if (user.isUpdated) {
      toast.success("Password updated successfully");
      history.push("/me");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [user, history, clearErrors, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    updatePassword(putFormDataInUpdatePassword(oldPassword, newPassword));
  };

  return (
    <Container>
      <MetaData title={"Change Password"} />

      <Row className="justify-content-center my-4">
        <Col xs={10} lg={4}>
          <Form onSubmit={submitHandler}>
            <h1 className="mb-5">Update Password</h1>
            <FormGroup>
              <Label for="old_password_field">Old Password</Label>
              <Input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="new_password_field">New Password</Label>
              <Input
                type="password"
                id="new_password_field"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormGroup>

            <Button
              color="warning"
              block
              className="text-white py-2"
              disabled={loading ? true : false}
            >
              Update Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {
  updatePassword: userActions.updatePassword,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
