import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { connect, useDispatch } from "react-redux";
import Product from "../product/Product";
import Slider from "rc-slider";
import { useAlert } from "react-alert";
import { CATEGORIES, MAX, MIN, RATINGS } from "../../constant";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import productActions from "../../actions/productActions";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export const Search = ({ productsDB, match, getProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([MIN, MAX]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = productsDB;

  const keyword = match.params.keyword;

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
      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <h1>Result is null</h1>
      ) : (
        <>
          <MetaData title={"Buy Best Products Online"} />

          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={MIN}
                        max={MAX}
                        defaultValue={[MIN, MAX]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />

                      <hr className="my-5" />

                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>

                        <ul className="pl-0">
                          {CATEGORIES.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="my-3" />

                      <div className="mt-5">
                        <h4 className="mb-3">Ratings</h4>

                        <ul className="pl-0">
                          {RATINGS.map((star) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={star}
                              onClick={() => setRating(star)}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{
                                    width: `${star * 20}%`,
                                  }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map((product) => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>

          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={">"}
                prevPageText={"<"}
                firstPageText={">>"}
                lastPageText={"<<"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
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
