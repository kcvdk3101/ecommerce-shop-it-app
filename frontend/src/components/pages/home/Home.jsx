import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Container } from "reactstrap";
import MetaData from "../../common/MetaData";
import FilteredProducts from "./FilteredProducts";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get("/api/v1/products");
        setProducts(response.data.products);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  const filterProducts = [
    {
      title: "Laptop",
      filteredProducts: products.filter(
        (product) => product.category === "Laptop"
      ),
    },
    {
      title: "Phone",
      filteredProducts: products.filter(
        (product) => product.category === "Phone"
      ),
    },
    {
      title: "Tablet",
      filteredProducts: products.filter(
        (product) => product.category === "Tablet"
      ),
    },
    {
      title: "Watch",
      filteredProducts: products.filter(
        (product) => product.category === "Watch"
      ),
    },
    {
      title: "Headphone",
      filteredProducts: products.filter(
        (product) => product.category === "Headphone"
      ),
    },
  ];

  return (
    <Container className="my-4">
      <MetaData title="Home Page" />
      <h1>Home Page</h1>

      {filterProducts.map((filterProduct, index) => (
        <FilteredProducts
          key={index}
          title={filterProduct.title}
          filteredProducts={filterProduct.filteredProducts}
        />
      ))}
    </Container>
  );
};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
