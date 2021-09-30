import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const ShippingForm = ({
  countriesList,
  address,
  city,
  phoneNo,
  postalCode,
  country,
  setAddress,
  setCity,
  setPhoneNo,
  setPostalCode,
  setCountry,
  submitHandler,
}) => {
  return (
    <Form onSubmit={submitHandler}>
      <h1 className="mb-4">Shipping Information</h1>
      <FormGroup>
        <Label htmlFor="address_field">Address</Label>
        <Input
          type="text"
          id="address_field"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="city_field">City</Label>
        <Input
          type="text"
          id="city_field"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="phone_field">Phone Number</Label>
        <Input
          type="phone"
          id="phone_field"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="postal_code_field">Postal Code</Label>
        <Input
          type="number"
          id="postal_code_field"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="country_field">Country</Label>
        <Input
          id="country_field"
          type="select"
          name="select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >
          {countriesList.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </Input>
      </FormGroup>

      <Button color="warning" className="text-white py-2 text-uppercase" block>
        Continue
      </Button>
    </Form>
  );
};

export default ShippingForm;
