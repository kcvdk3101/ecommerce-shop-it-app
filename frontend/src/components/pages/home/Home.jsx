import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Container } from "reactstrap";
import { CATEGORIES } from "../../../constant";
import MetaData from "../../common/MetaData";
import Banner from "./Banner";
import FilteredProducts from "./FilteredProducts";
import Loader from "../../common/Loader";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/products");
        setProducts(response.data.products);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filterProducts = CATEGORIES.map((ctgr) => ({
    title: ctgr,
    filteredProducts: products.filter((product) => product.category === ctgr),
  }));

  return (
    <Container className="mb-4">
      <MetaData title="Home Page" />
      <Banner />
      {loading ? (
        <Loader />
      ) : (
        <>
          {filterProducts.map((filterProduct, index) => (
            <FilteredProducts
              key={index}
              title={filterProduct.title}
              filteredProducts={filterProduct.filteredProducts}
            />
          ))}
        </>
      )}
    </Container>
  );
};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
