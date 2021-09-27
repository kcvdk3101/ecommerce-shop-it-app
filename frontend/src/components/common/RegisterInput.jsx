import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const RegisterInput = ({
  id,
  loading,
  title,
  inputName,
  type,
  value,
  placeholder,
  handleChangeInput,
}) => {
  return (
    <FormGroup className="my-4">
      <Label htmlFor={inputName}>{title}</Label>
      <Input
        id={id}
        name={inputName}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChangeInput(inputName, e.target.value)}
        disabled={loading ? true : false}
      />
    </FormGroup>
  );
};

export default RegisterInput;
