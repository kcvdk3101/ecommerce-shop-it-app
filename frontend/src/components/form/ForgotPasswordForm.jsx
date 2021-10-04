import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { clearErrors } from "../../actions/clearErrors";
import userActions from "../../actions/userActions";

const ForgotPasswordForm = ({
  clearErrors,
  forgotPassword,
  forgotUserPassword,
}) => {
  const { error, loading, message } = forgotPassword;
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (message) {
      toast.success(message);
    }
  }, [error, message, clearErrors]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);

    forgotUserPassword(formData);
  };

  return (
    <Form onSubmit={submitHandler}>
      <FormGroup>
        <Label htmlFor="email_field">
          Enter your email to get reset password
        </Label>
        <Input
          type="email"
          id="email_field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading ? true : false}
        />
      </FormGroup>

      <Button
        block
        color="warning"
        className="text-white"
        disabled={loading ? true : false}
      >
        {loading ? <Spinner color="light" /> : "Send Mail"}
      </Button>
    </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);
