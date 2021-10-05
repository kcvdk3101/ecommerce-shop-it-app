import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import productActions from "../actions/productActions";
import MetaData from "./common/MetaData";

const Home = ({ getProducts, products }) => {
  const filterByRatingProducts = products.products.filter(
    (product) => product.ratings >= 4
  );
  const filterByPhoneProducts = products.products.filter(
    (product) => product.category === "Phone"
  );
  const filterByLaptopProducts = products.products.filter(
    (product) => product.category === "Laptop"
  );
  const filterByTabletProducts = products.products.filter(
    (product) => product.category === "Tablet"
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  console.log(products);

  return (
    <Container className="my-4">
      <MetaData title="Home Page" />
      <h1>Home Page</h1>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

const mapDispatchToProps = {
  getProducts: productActions.getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
