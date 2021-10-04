import Slider from "rc-slider";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import productActions from "../../../actions/productActions";
import { CATEGORIES, MAX, MIN, RATINGS } from "../../../constant";
import Loader from "../../common/Loader";
import MetaData from "../../common/MetaData";
import ProductCardView from "../../common/ProductCardView";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export const Search = ({ productsDB, match, getProducts }) => {
  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = productsDB;

  const keyword = match.params.keyword;

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([MIN, MAX]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    getProducts(keyword, currentPage, price, category, rating);
  }, [error, keyword, currentPage, price, category, rating, getProducts]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <Container className="my-4">
      <MetaData title="Search" />
      <Row>
        <Col xs={12} lg={3} className="my-2">
          <h3>Filter by</h3>
          <h4> Price</h4>
          <div>
            <Range
              min={MIN}
              max={MAX}
              defaultValue={[MIN, MAX]}
              tipFormatter={(value) => `${value}`}
              tipProps={{
                placement: "bottom",
                visible: true,
              }}
              value={price}
              onChange={(price) => setPrice(price)}
            />
          </div>
          <hr className="my-5" />
          <h4>Category</h4>
          <div>
            {CATEGORIES.map((c, i) => (
              <h5
                key={i}
                className="my-2"
                style={{ cursor: "pointer" }}
                onClick={() => setCategory(c)}
              >
                {c}
              </h5>
            ))}
          </div>
          <hr className="my-5" />
          <h4>Ratings</h4>
          <div>
            {RATINGS.map((star) => (
              <div
                key={star}
                className="my-2"
                style={{ cursor: "pointer" }}
                onClick={() => setRating(star)}
              >
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{
                      width: `${(star / 5) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Col>
        {loading ? (
          <Loader />
        ) : (
          <Col xs={12} lg={9}>
            {resPerPage < count && (
              <Row>
                <Col xs={12}>
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText={">"}
                    prevPageText={"<"}
                    firstPageText={"<<"}
                    lastPageText={">>"}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </Col>
              </Row>
            )}
            <Row>
              {products &&
                products.map((product) => (
                  <Col key={product._id} xs={12} md={6} lg={4} className="my-2">
                    <ProductCardView product={product} />
                  </Col>
                ))}
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    productsDB: state.products,
  };
}

const mapDispatchToProps = {
  getProducts: productActions.getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
