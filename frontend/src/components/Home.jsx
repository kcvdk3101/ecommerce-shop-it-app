import "rc-slider/assets/index.css";
import React from "react";
import { Container } from "reactstrap";
import MetaData from "./layout/MetaData";

const Home = () => {
  return (
    <Container className="my-4">
      <MetaData title="Home Page" />
      <h1>Home Page</h1>
    </Container>
  );
};

export default Home;
