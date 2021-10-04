import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { DELETE_REVIEW_RESET } from "../../actions/actionTypes/productActionTypes";
import { clearErrors } from "../../actions/clearErrors";
import productActions from "../../actions/productActions";
import MetaData from "../common/MetaData";
import Sidebar from "./Sidebar";

const ProductReviews = ({
  getProductReviews,
  deleteReview,
  productReviews,
  review,
  clearErrors,
}) => {
  const { error, reviews } = productReviews;
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
    if (review.deleteError) {
      toast.error(review.deleteError);
      clearErrors();
    }
    if (productId !== "") {
      getProductReviews(productId);
    }
    if (review.isDeleted) {
      toast.success("Review deleted successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, productId, review, getProductReviews, clearErrors]);

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
        user: `${review.firstName} ${review.lastName}`,

        actions: (
          <Button
            color="danger"
            className="py-1 px-2 ml-2"
            onClick={() => deleteReviewHandler(review._id)}
          >
            <i className="fa fa-trash"></i>
          </Button>
        ),
      });
    });

    return data;
  };

  const deleteReviewHandler = (id) => {
    deleteReview(id, productId);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getProductReviews(productId);
  };

  return (
    <>
      <MetaData title={"Product Reviews"} />
      <Row>
        <Col xs={12} md={2}>
          <Sidebar />
        </Col>

        <Col xs={12} md={10}>
          <Row className="justify-content-center mt-5">
            <Col xs={5}>
              <Form onSubmit={submitHandler}>
                <FormGroup>
                  <Label htmlFor="productId_field">Enter Product ID</Label>
                  <Input
                    type="text"
                    id="productId_field"
                    className="form-control"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </FormGroup>

                <Button
                  color="warning"
                  block
                  className="text-white text-uppercase py-2"
                >
                  search
                </Button>
              </Form>
            </Col>
          </Row>

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
        </Col>
      </Row>
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
