import React from "react";
import { Alert, Button, Input, ListGroup, ListGroupItem } from "reactstrap";

const ProductDetailsDescription = ({
  user,
  product,
  comment,
  setComment,
  setUserRatings,
  quantity,
  increaseQty,
  decreaseQty,
  addToCart,
  reviewHandler,
}) => {
  return (
    <ListGroup flush>
      <ListGroupItem>
        <h2>{product.name}</h2>
        <p className="text-black-50 fs-6">{product.category}</p>
      </ListGroupItem>
      <ListGroupItem>
        <div className="rating-outer">
          <div
            className="rating-inner"
            style={{ width: `${(product.ratings / 5) * 100}%` }}
          ></div>
        </div>
        <span id="no_of_reviews">
          ({product.numOfReviews}{" "}
          {product.numOfReviews > 1 ? "Reviews" : "Review"})
        </span>
      </ListGroupItem>
      <ListGroupItem>
        <p className="fw-bold fs-2">${product.price}</p>
        <div className="stockCounter d-inline">
          <Button color="primary" className="py-1 px-2" onClick={decreaseQty}>
            -
          </Button>

          <Input type="number" className="d-inline" value={quantity} readOnly />

          <Button color="danger" className="py-1 px-2" onClick={increaseQty}>
            +
          </Button>
        </div>
        <Button
          color={product.stock <= 0 ? "secondary" : "warning"}
          className="rounded-pill ms-4 px-4 text-white"
          onClick={addToCart}
          disabled={product.stock <= 0}
        >
          Add to Cart
        </Button>
      </ListGroupItem>
      <ListGroupItem>
        <p>
          Status:
          <span
            className={`ms-1 fw-bold fs-4  ${
              product.stock > 0 ? "text-success" : "text-danger"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>
      </ListGroupItem>
      <ListGroupItem>
        <h4 className="mt-2">Description:</h4>
        <p>{product.description}</p>
        <hr />
        <p id="product_seller mb-3">
          Sold by: <strong>{product.seller}</strong>
        </p>

        {user ? (
          <Button
            color="warning"
            className="rounded-pill py-2 px-5 text-white"
            data-toggle="modal"
            data-target="#ratingModal"
            onClick={setUserRatings}
          >
            Submit Your Review
          </Button>
        ) : (
          <Alert color="danger">Login to post your review.</Alert>
        )}

        <div className="row mt-2 border-primary border">
          <div className="rating w-50">
            <div
              className="modal fade"
              id="ratingModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="ratingModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="ratingModalLabel">
                      Submit Review
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <ul className="stars">
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>

                    <textarea
                      name="review"
                      id="review"
                      className="form-control mt-3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>

                    <Button
                      color="warning"
                      className="text-white"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={reviewHandler}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ListGroupItem>
    </ListGroup>
  );
};

export default ProductDetailsDescription;
