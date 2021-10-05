import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import { NEW_REVIEW_RESET } from "../../../actions/actionTypes/productActionTypes";
import cartActions from "../../../actions/cartActions";
import { clearErrors } from "../../../actions/clearErrors";
import productActions from "../../../actions/productActions";
import Loader from "../../common/Loader";
import MetaData from "../../common/MetaData";
import ListReviews from "./ListReviews";
import ProductDetailsCarousel from "./ProductDetailsCarousel";
import ProductDetailsDescription from "./ProductDetailsDescription";

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

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    getProductDetails(match.params.id);
    if (error) {
      toast.error(error);
      clearErrors();
    }
    if (newReview.reviewError) {
      toast.error(newReview.reviewError);
      clearErrors();
    }
    if (newReview.success) {
      toast.success("Review posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [
    dispatch,
    error,
    newReview,
    match.params.id,
    getProductDetails,
    clearErrors,
  ]);

  const addToCart = () => {
    addItemToCart(match.params.id, quantity);
    toast.success("Item Added to Cart");
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
    formData.set("firstName", user.firstName);
    formData.set("lastName", user.lastName);
    formData.set("productId", match.params.id);

    addNewReview(formData);
  };

  return (
    <>
      <MetaData title={product.name} />
      {loading ? (
        <Loader />
      ) : (
        <Container className="my-4">
          <Row className="d-flex my-3 gap-3">
            <Col xs={12} lg={6} className="mt-5">
              {product.images && <ProductDetailsCarousel product={product} />}
            </Col>
            <Col xs={12} lg={5}>
              <ProductDetailsDescription
                user={user}
                product={product}
                comment={comment}
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
        </Container>
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
  getProductDetails: productActions.getProductDetails,
  addNewReview: productActions.newReview,
  addItemToCart: cartActions.addItemToCart,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
