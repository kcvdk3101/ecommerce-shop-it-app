import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import LoginInput from "../common/LoginInput";
import ForgotPassword from "./ForgotPasswordForm";

const LoginForm = ({
  submitHandler,
  loading,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col xs={5}>
        <Form className="p-5" onSubmit={submitHandler}>
          <h1 className="mb-3">Enjoy !</h1>
          <LoginInput
            loading={loading}
            id="email_field"
            title="Email"
            inputName="email"
            type="email"
            value={email}
            setChangeInput={setEmail}
          />
          <LoginInput
            loading={loading}
            id="password_field"
            title="Password"
            inputName="password"
            type="password"
            value={password}
            setChangeInput={setPassword}
          />
          <div className="w-100 d-flex justify-content-between mb-3">
            <Link to="#!" style={{ textDecoration: "none" }} onClick={toggle}>
              Forgot Password?
            </Link>
            <Link to={loading ? "#!" : "/register"} className="text-warning">
              New User?
            </Link>
          </div>
          <Button
            className="btn btn-warning w-100 text-white text-uppercase py-2"
            disabled={loading ? true : false}
            style={{ fontWeight: 600 }}
          >
            {loading ? <Spinner color="light" /> : "Login"}
          </Button>
        </Form>
      </Col>
      <Modal isOpen={modal} toggle={toggle} backdrop>
        <ModalHeader toggle={toggle}>Forget Password</ModalHeader>
        <ModalBody>
          <ForgotPassword />
        </ModalBody>
      </Modal>
    </Row>
  );
};

export default LoginForm;
