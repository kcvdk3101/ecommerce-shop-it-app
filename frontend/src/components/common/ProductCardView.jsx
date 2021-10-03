import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";

const ProductCardView = ({ product }) => {
  return (
    <Card className="card d-flex p-2 rounded">
      <CardImg
        className="flex-shirk-0 mx-auto"
        src={product.images[0].url}
        style={{ height: 170, objectFit: "scale-down" }}
      />
      <CardBody className="flex-1 d-flex flex-column justify-content-around">
        <CardTitle
          tag="h4"
          className="card_title flex-shrink-0 d-flex flex-column align-items-between"
        >
          <Link className="flex-shrink-0" to={`/product/${product._id}`}>
            {product.name}
          </Link>
          <div className="flex-1 mt-auto">
            <div className="ratings">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{
                    width: `${(product.ratings / 5) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="ms-2">
                ({product.numOfReviews}{" "}
                {product.numOfReviews > 1 ? "Reviews" : "Review"})
              </span>
            </div>
            <CardText>${product.price}</CardText>
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
