import React from "react";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import UploadAvatar from "../common/UploadAvatar";

const UpdateProfileForm = ({
  loading,
  submitHandler,
  avatar,
  onAvatarChange,
  firstName,
  lastName,
  email,
  setFirstName,
  setLastName,
  setEmail,
}) => {
  return (
    <Form className="p-5" onSubmit={submitHandler}>
      <h1 className="mb-5">Update Profile</h1>

      <FormGroup>
        <Label htmlFor="firstName_field">First Name</Label>
        <Input
          type="text"
          id="firstName_field"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="lastName_field">Last Name</Label>
        <Input
          type="text"
          id="lastName_field"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email_field">Email</Label>
        <Input
          type="email"
          id="email_field"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>

      <UploadAvatar avatar={avatar} onAvatarChange={onAvatarChange} />

      <Button
        color="warning"
        className="w-100 text-white text-uppercase py-2"
        disabled={loading ? true : false}
        style={{ fontWeight: 600 }}
      >
        {loading ? <Spinner color="light" /> : "Update"}
      </Button>
    </Form>
  );
};

export default UpdateProfileForm;
