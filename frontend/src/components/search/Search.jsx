import Slider from "rc-slider";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { connect, useDispatch } from "react-redux";
import { Col, Row } from "reactstrap";
import productActions from "../../actions/productActions";
import { CATEGORIES, MAX, MIN, RATINGS } from "../../constant";
import ProductCardView from "../common/ProductCardView";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

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

  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    getProducts(keyword, currentPage, price, category, rating);
  }, [
    dispatch,
    alert,
    error,
    keyword,
    currentPage,
    price,
    category,
    rating,
    getProducts,
  ]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <>
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
    </>
  );
};

function mapStateToProps(state) {
  console.log(state.products);
  return {
    productsDB: state.products,
  };
}

const mapDispatchToProps = {
  getProducts: productActions.getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
