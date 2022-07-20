import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../Layout/Metadata";

import { Link, useParams } from "react-router-dom";
import { Typography } from '@mui/material';

import { getOrderDetails, clearErrors } from "../../../redux/action/orderaction";
import Loader1 from "../../Layout/Loader/loader";
import { useAlert } from "react-alert";

const OrderDetails = () => {
  const id = useParams().id;
  const { order, error } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {order ? (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                <span>Order No: </span> {order && order._id}
              </Typography>
              <Typography>Checkout Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.checkout.name}</span>
                </div>
                <div>
                  <p>Email:</p>
                  <span>{order.user && order.user}</span>
                </div>
                <div>
                  <p>University:</p>
                  <span>
                    {order.user && order.checkout.university}
                  </span>
                </div>
                <div>
                  <p>Department:</p>
                  <span>
                    {order.user && order.checkout.department}
                  </span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.user && order.checkout.phoneNo}
                  </span>
                </div>

              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}<span>PKR</span></span>
                </div>
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                        order.paymentInfo.status === "PAID"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                      order.paymentInfo.status === "PAID"
                      ? "PAID"
                      : "Pending"}
                  </p>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Verified"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    item.course?(
                      <div key={item.course}>
                      <img src={item.image} alt="Course" />
                      <Link to={`/course/details/${item.course}`}>
                        {item.name}
                      </Link>{" "}
                      <span>

                        <b>PKR {item.price}</b>
                      </span>
                    </div>
                    ):(
                      <div key={item.event}>
                      <img src={item.image} alt="Workshop" />
                      <Link to={`/event/details/${item.event}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                       
                        <b>PKR {item.price }</b>
                      </span>
                    </div>
                    )
                    
                  ))}
              </div>
              <span>

                <b>TOTAL=PKR {order.totalPrice}</b>
              </span>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="search_holder">
          <Loader1 />
        </div>
      )}
    </Fragment>
  );
};

export default OrderDetails;
