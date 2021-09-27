import React from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";

const UploadAvatar = ({ avatar, onAvatarChange }) => {
  return (
    <FormGroup className="my-4">
      <Label className="mb-3" htmlFor="avatar_upload">
        Avatar
      </Label>
      <Row className="d-flex align-items-center">
        <Col xs={4} className="d-flex flex-column align-items-center">
          <figure className="avatar">
            <img
              src={avatar}
              className="rounded-circle img-fluid"
              alt="Default Avatar"
            />
          </figure>
          <small>Default Image</small>
        </Col>
        <Col xs>
          <Input
            type="file"
            name="avatar"
            id="customFile"
            accept="image/*"
            onChange={onAvatarChange}
          />
        </Col>
      </Row>
    </FormGroup>
  );
};

export default UploadAvatar;
