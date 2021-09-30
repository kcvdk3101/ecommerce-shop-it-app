import { countries } from "countries-list";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import cartActions from "../../actions/cartActions";
import ShippingForm from "../form/ShippingForm";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = ({ history, cart, saveShippingInfo }) => {
  const countriesList = Object.values(countries);

  const { shippingInfo } = cart;

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingInfo({ address, city, phoneNo, postalCode, country });
    history.push("/confirm");
  };

  return (
    <Container className="my-4">
      <MetaData title={"Shipping Information"} />

      <CheckoutSteps shipping />

      <Row className="d-flex justify-content-center align-items-center my-5">
        <Col xs={10} lg={5}>
          <ShippingForm
            countriesList={countriesList}
            address={address}
            city={city}
            phoneNo={phoneNo}
            postalCode={postalCode}
            country={country}
            setAddress={setAddress}
            setCity={setCity}
            setPhoneNo={setPhoneNo}
            setPostalCode={setPostalCode}
            setCountry={setCountry}
            submitHandler={submitHandler}
          />
        </Col>
      </Row>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

const mapDispatchToProps = {
  saveShippingInfo: cartActions.saveShippingInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
