import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const LoginInput = ({
  id,
  loading,
  title,
  inputName,
  type,
  value,
  setChangeInput,
}) => {
  return (
    <FormGroup className="my-4">
      <Label htmlFor={inputName}>{title}</Label>
      <Input
        id={id}
        name={inputName}
        type={type}
        value={value}
        onChange={(e) => setChangeInput(e.target.value)}
        disabled={loading ? true : false}
      />
    </FormGroup>
  );
};

export default LoginInput;
