import React from "react";
import { Button, Col, Form, Row, Spinner } from "reactstrap";
import RegisterInput from "../common/RegisterInput";
import UploadAvatar from "../common/UploadAvatar";

const RegisterForm = ({
  submitHandler,
  loading,
  avatar,
  onAvatarChange,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  handleChangeInput,
}) => {
  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col xs={5}>
        <Form
          className="p-5"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <h1 className="mb-3" style={{ fontFamily: "'Pacifico', cursive" }}>
            Let's join with us
          </h1>
          <RegisterInput
            id="firstName_field"
            loading={loading}
            title="First Name"
            inputName="firstName"
            type="text"
            value={firstName}
            handleChangeInput={handleChangeInput}
            placeholder="First name"
          />
          <RegisterInput
            id="lastName_field"
            loading={loading}
            title="Last Name"
            inputName="lastName"
            type="text"
            value={lastName}
            handleChangeInput={handleChangeInput}
            placeholder="Last name"
          />
          <RegisterInput
            id="email_field"
            loading={loading}
            title="Email"
            inputName="email"
            type="email"
            value={email}
            handleChangeInput={handleChangeInput}
            placeholder="Enter your email"
          />
          <RegisterInput
            id="password_field"
            loading={loading}
            title="Password"
            inputName="password"
            type="password"
            value={password}
            handleChangeInput={handleChangeInput}
            placeholder="Enter your password"
          />
          <RegisterInput
            id="confirmPassword_field"
            loading={loading}
            title="Confirm Password"
            inputName="confirmPassword"
            type="password"
            value={confirmPassword}
            handleChangeInput={handleChangeInput}
          />

          <UploadAvatar avatar={avatar} onAvatarChange={onAvatarChange} />

          <Button
            className="btn btn-warning w-100 text-white text-uppercase py-2"
            disabled={loading ? true : false}
            style={{ fontWeight: 600 }}
          >
            {loading ? <Spinner color="light" /> : "Register"}
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default RegisterForm;
