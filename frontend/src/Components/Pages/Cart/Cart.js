import React, { Fragment } from "react";
import "./Cart.css";
import CartItem from "./cartitem";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { removeItemsFromCart } from "../../../redux/action/cartAction";
import { Link, useNavigate } from "react-router-dom";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
function Cart() {


  const history = useNavigate();

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history("/checkout");
  };

  return (
    <Fragment>
      <div className="course_cart">
        {cartItems.length === 0 ? (
          <div className="emptyCart grid">
            <RemoveShoppingCartOutlinedIcon />
            <Typography>No Course in Your Cart</Typography>
            <Link className="btn_primary" to="/courses">
              View Course
            </Link>
          </div>
        ) : (
          <Fragment>
            <div className="cart">
              <h1>Joined Course Cart</h1>

              <div className="cart_allCourses">
                {cartItems &&
                  cartItems.map((item, key) => (
                    <CartItem
                      item={item}
                      deleteCartItems={deleteCartItems}
                      key={key}
                    />
                   

                  ))}
              </div>

              <div className="cart_checkout">
                <span className="crs_total">Total:</span>
                <span className="checkout_price">
                  {`${cartItems.reduce((acc, item) => acc + item.price, 0)}`}
                  <span className="currency">PKR</span>
                </span>
                <button className="btn_primary" onClick={checkoutHandler}>
                  Checkout
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default Cart;
