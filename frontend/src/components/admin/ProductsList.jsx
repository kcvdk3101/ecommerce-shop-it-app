import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors } from "../../actions/clearErrors";
import productActions from "../../actions/productActions";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

const ProductsList = ({
  history,
  product,
  getAdminProducts,
  deleteProduct,
  clearErrors,
  products,
}) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error: deleteError, isDeleted } = product;

  useEffect(() => {
    getAdminProducts();

    if (products.error) {
      alert.error(products.error);
      clearErrors();
    }

    if (deleteError) {
      alert.error(deleteError);
      clearErrors();
    }

    if (isDeleted) {
      alert.success("Product deleted successfully");
      history.push("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    deleteError,
    isDeleted,
    getAdminProducts,
    clearErrors,
    products,
    history,
  ]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    products.products.forEach((p) => {
      data.rows.push({
        id: p._id,
        name: p.name,
        price: `$${p.price}`,
        stock: p.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${p._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductHandler(p._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    deleteProduct(id);
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Products</h1>

            {products.loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    products: state.products,
    product: state.product,
  };
}

const mapDispatchToProps = {
  getAdminProducts: productActions.getAdminProducts,
  deleteProduct: productActions.deleteProduct,
  clearErrors: clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
