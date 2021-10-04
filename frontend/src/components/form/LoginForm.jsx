import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import ForgotPassword from "./ForgotPasswordForm";

const LoginForm = ({
  submitHandler,
  loading,
  email,
  password,
  handleChangeInput,
}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col xs={5}>
        <Form className="p-5" onSubmit={submitHandler}>
          <h1 className="mb-3">Enjoy !</h1>
          <FormGroup className="my-4">
            <Label htmlFor="email_field">Email</Label>
            <Input
              id="email_field"
              name="email"
              type="email"
              value={email}
              onChange={handleChangeInput}
              disabled={loading ? true : false}
            />
          </FormGroup>
          <FormGroup className="my-4">
            <Label htmlFor="password_field">Password</Label>
            <Input
              id="password_field"
              name="password"
              type="password"
              value={password}
              onChange={handleChangeInput}
              disabled={loading ? true : false}
            />
          </FormGroup>
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
