import React from "react";
import LoginInput from "../common/LoginInput";
import { Button, Col, Form, Row, Spinner } from "reactstrap";
import { Link } from "react-router-dom";

const LoginForm = ({
  submitHandler,
  loading,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col xs={5}>
        <Form className="p-5" onSubmit={submitHandler}>
          <h1 className="mb-3" style={{ fontFamily: "'Pacifico', cursive" }}>
            Enjoy !
          </h1>
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
            <Link
              to={loading ? "#!" : "/password/forgot"}
              className="text-dark"
            >
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
    </Row>
  );
};

export default LoginForm;
