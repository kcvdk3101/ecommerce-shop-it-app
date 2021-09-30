import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cartActions from "../../actions/cartActions";
import MetaData from "../layout/MetaData";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Input,
  Container,
} from "reactstrap";

const Cart = ({ history, cart, addItemToCart, removeItemFromCart }) => {
  const { cartItems } = cart;
  const totalItems = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    addItemToCart(id, newQty);
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    addItemToCart(id, newQty);
  };

  const removeCartItemHandler = (id) => {
    removeItemFromCart(id);
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Container className="my-4">
      <MetaData title={"Your Cart"} />
      {cartItems.length === 0 ? (
        <h2 className="mb-5" style={{ height: "50vh" }}>
          Your Cart is Empty
        </h2>
      ) : (
        <>
          <h2 className="mb-5">
            Your Cart: <b>{cartItems.length} items</b>
          </h2>

          <Row className="d-flex justify-content-between">
            <Col xs={12} lg={8}>
              <ListGroup flush>
                {cartItems.map((item) => (
                  <ListGroupItem key={item.product}>
                    <Row className="d-flex justify-content-center align-items-center">
                      <Col xs={4} lg={3}>
                        <img src={item.image} alt="Laptop" width="115" />
                      </Col>

                      <Col xs={5} lg={3}>
                        <Link className="fs-5" to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>

                      <Col xs={4} lg={2} className="mt-4 mt-lg-0">
                        <p className="text-warning fw-bold fs-4">
                          ${item.price}
                        </p>
                      </Col>

                      <Col xs={4} lg={3} className="mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <Button
                            color="primary"
                            className="py-1 px-2"
                            onClick={() =>
                              decreaseQty(item.product, item.quantity)
                            }
                          >
                            -
                          </Button>

                          <Input
                            type="number"
                            className="d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <Button
                            color="danger"
                            className="py-1 px-2"
                            onClick={() =>
                              increaseQty(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                      </Col>

                      <Col xs={4} lg={1} className="mt-4 mt-lg-0">
                        <ion-icon
                          id="delete_cart_item"
                          name="trash"
                          onClick={() => removeCartItemHandler(item.product)}
                        ></ion-icon>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>

            <Col xs={12} lg={4} className="my-4 my-lg-0">
              <ListGroup flush className="border py-4 px-4 rounded-3">
                <ListGroupItem>
                  <h4>Order Summary</h4>
                </ListGroupItem>
                <ListGroupItem>
                  <p className="fs-5">
                    Total:{" "}
                    <span className="fw-bold">
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </span>
                    <span className="fw-bold float-end">
                      ({totalItems} {totalItems > 1 ? "Items" : "Item"})
                    </span>
                  </p>
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    color="warning"
                    block
                    className="text-white py-2"
                    onClick={checkoutHandler}
                  >
                    Check out
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

const mapDispatchToProps = {
  removeItemFromCart: cartActions.removeItemFromCart,
  addItemToCart: cartActions.addItemToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
