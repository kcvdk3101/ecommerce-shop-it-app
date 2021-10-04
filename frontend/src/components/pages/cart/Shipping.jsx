import { countries } from "countries-list";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import cartActions from "../../../actions/cartActions";
import ShippingForm from "../../form/ShippingForm";
import MetaData from "../../common/MetaData";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = ({ history, cart, saveShippingInfo }) => {
  const countriesList = Object.values(countries);
  const { shippingInfo } = cart;

  const [shippingData, setShippingData] = useState({
    address: shippingInfo.address,
    city: shippingInfo.city,
    phoneNumber: shippingInfo.phoneNumber,
    country: shippingInfo.country,
  });

  const handleChangeInput = (e) =>
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingInfo({ ...shippingData });
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
            address={shippingData.address}
            city={shippingData.city}
            phoneNumber={shippingData.phoneNumber}
            country={shippingData.country}
            handleChangeInput={handleChangeInput}
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
