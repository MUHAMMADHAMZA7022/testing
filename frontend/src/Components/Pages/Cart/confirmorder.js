import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/checkoutsteps";
import { useSelector } from "react-redux";
import "./confirmorder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
const ConfirmOrder = () => {
  let history = useNavigate();
  const { checkout, cartItems } = useSelector((state) => state.cart);
  // const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  // subtotal > 1000 ? 0 : 200;

  //const tax = subtotal * 0.18;

  const totalPrice = subtotal;

  const proceedToPayment = () => {
    const data = {
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history("/process/payment");
  };

  return (
    <Fragment>
      {/* <MetaData title="Confirm Order" /> */}
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{checkout.name}</span>
              </div>
              <div>
                <p>Email:</p>
                <span>{checkout.email}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{checkout.phoneNo}</span>
              </div>
              <div>
                <p>University:</p>
                <span>{checkout.university}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.course} className='cartConfirm_courses'>
                    <img src={item.image} alt="Product" />
                    <Link to={`/onecourse/${item.course}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      PRICE = <b>PKR {item.price}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="checkout_summary">
          <h1>Summary</h1>
          <div className="checkout_summary_holder">
            <div className="chk_bar">
              <span>Total price:</span>
              <span className="chk_prc">
                {subtotal}
                <span className="chk_currency">PKR</span>
              </span>
            </div>
            <button type="submit" className="btn_primary" onClick={proceedToPayment}>
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
