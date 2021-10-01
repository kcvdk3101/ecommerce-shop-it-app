import { MDBDataTable } from "mdbreact";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
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

  // const { error: deleteError, isDeleted } = product;

  useEffect(() => {
    getAdminProducts();
    if (product.error) {
      alert.error(product.error);
      clearErrors();
    }

    // if (deleteError) {
    //   alert.error(deleteError);
    //   clearErrors();
    // }

    if (product.isDeleted) {
      alert.success("Product deleted successfully");
      history.push("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [alert, clearErrors, dispatch, getAdminProducts, history, product]);

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
          <>
            <Link
              to={`/admin/product/${p._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              color="danger"
              className="p-2 ml-2"
              onClick={() => deleteProductHandler(p._id)}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    deleteProduct(id);
  };

  return (
    <>
      <MetaData title={"All Products"} />
      <Row>
        <Col xs={12} md={2}>
          <Sidebar />
        </Col>

        <Col xs={12} md={10}>
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
        </Col>
      </Row>
    </>
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
