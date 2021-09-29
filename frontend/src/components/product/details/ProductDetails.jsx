import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux";
import { Col, Row } from "reactstrap";
import cartActions from "../../../actions/cartActions";
import { clearErrors } from "../../../actions/clearErrors";
import productsAction from "../../../actions/productActions";
import { NEW_REVIEW_RESET } from "../../../constants/productConstants";
import ProductDetailsCarousel from "./ProductDetailsCarousel";
import ProductDetailsDescription from "./ProductDetailsDescription";
import Loader from "../../layout/Loader";
import MetaData from "../../layout/MetaData";
import ListReviews from "../../review/ListReviews";

const ProductDetails = ({
  productDetails,
  auth,
  newReview,
  addNewReview,
  getProductDetails,
  addItemToCart,
  clearErrors,
  match,
}) => {
  const { loading, error, product } = productDetails;
  const { user } = auth;
  const { error: reviewError, success } = newReview;

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    getProductDetails(match.params.id);
    if (error) {
      alert.error(error);
      clearErrors();
    }
    if (reviewError) {
      alert.error(reviewError);
      clearErrors();
    }
    if (success) {
      alert.success("Review posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    reviewError,
    match.params.id,
    success,
    getProductDetails,
    clearErrors,
  ]);

  const addToCart = () => {
    addItemToCart(match.params.id, quantity);
    alert.success("Item Added to Cart");
  };

  const increaseQty = () => {
    if (quantity >= product.stock) return;
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", match.params.id);

    addNewReview(formData);
  };

  return (
    <>
      <MetaData title={product.name} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row className="d-flex my-3 gap-3">
            <Col xs={12} lg={6} className="mt-5">
              {product.images && <ProductDetailsCarousel product={product} />}
            </Col>
            <Col xs={12} lg={5}>
              <ProductDetailsDescription
                user={user}
                product={product}
                setComment={setComment}
                setUserRatings={setUserRatings}
                quantity={quantity}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                addToCart={addToCart}
                reviewHandler={reviewHandler}
              />
            </Col>
          </Row>
          {product.reviews && product.reviews.length > 0 && (
            <ListReviews reviews={product.reviews} />
          )}
        </>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    productDetails: state.productDetails,
    newReview: state.newReview,
  };
}

const mapDispatchToProps = {
  getProductDetails: productsAction.getProductDetails,
  addNewReview: productsAction.newReview,
  addItemToCart: cartActions.addItemToCart,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
