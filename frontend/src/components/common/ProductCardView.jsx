import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

const ProductCardView = ({ product, addToCart }) => {
  return (
    <Card className="card d-flex rounded">
      <CardImg
        className="flex-shirk-0 mx-auto p-1"
        src={product.images[0].url}
        style={{ height: 170, objectFit: "scale-down" }}
      />
      <CardBody className="flex-1 d-flex flex-column justify-content-around">
        <CardTitle
          tag="h4"
          className="card_title flex-shrink-0 d-flex flex-column align-items-between"
        >
          <Link
            className="flex-shrink-0 "
            to={`/product/${product._id}`}
            style={{ minHeight: 100, maxHeight: 100 }}
          >
            {product.name}
          </Link>
          <div className="flex-1 mt-auto">
            <div className="ratings my-2">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{
                    width: `${(product.ratings / 5) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="ms-2 fs-6">
                ({product.numOfReviews}{" "}
                {product.numOfReviews > 1 ? "Reviews" : "Review"})
              </span>
            </div>
            <Row>
              <Col>${product.price}</Col>
              <Col className="d-flex justify-content-end">
                <Button
                  color="danger"
                  className="rounded-pill add_icon"
                  onClick={() => addToCart(product._id)}
                >
                  <i className="fa fa-plus"></i>
                </Button>
              </Col>
            </Row>
          </div>
        </CardTitle>
        <div className="flex-1">
          <Link to={`/product/${product._id}`}>
            <Button color="warning" block className="py-2 text-white">
              View Details
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCardView;
