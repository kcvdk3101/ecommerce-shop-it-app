import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux";
import { clearErrors } from "../../actions/clearErrors";
import productActions from "../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

const ProductReviews = ({
  getProductReviews,
  deleteReview,
  productReviews,
  review,
  clearErrors,
}) => {
  const { error, reviews } = productReviews;
  const { isDeleted, error: deleteError } = review;

  const alert = useAlert();
  const dispatch = useDispatch();

  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (productId !== "") {
      dispatch(getProductReviews(productId));
    }

    if (isDeleted) {
      alert.success("Review deleted successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    productId,
    isDeleted,
    deleteError,
    getProductReviews,
  ]);

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,

        actions: (
          <button
            className="btn btn-danger py-1 px-2 ml-2"
            onClick={() => deleteReviewHandler(review._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title={"Product Reviews"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="productId_field">Enter Product ID</label>
                    <input
                      type="text"
                      id="productId_field"
                      className="form-control"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

                  <button
                    id="search_button"
                    type="submit"
                    className="btn btn-primary btn-block py-2"
                  >
                    SEARCH
                  </button>
                </form>
              </div>
            </div>

            {reviews && reviews.length > 0 ? (
              <MDBDataTable
                data={setReviews()}
                className="px-3"
                bordered
                striped
                hover
              />
            ) : (
              <p className="mt-5 text-center">No Reviews.</p>
            )}
          </Fragment>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    review: state.review,
    productReviews: state.productReviews,
  };
}

const mapDispatchToProps = {
  getProductReviews: productActions.getProductReviews,
  deleteReview: productActions.deleteReview,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviews);
