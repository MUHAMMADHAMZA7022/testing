import React, { Fragment, } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./odersuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, connect} from "react-redux";

const OrderSuccess = (props) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Fragment>
      {props.newOrder ? ( 
      <div className="orderSuccess">
        <CheckCircleIcon />
        <Typography>Your Order has been Placed successfully </Typography>
        {/* <h1> {props.newOrder && props.newOrder.order._id}</h1> */}
        <div className="order_detailed">
          <span><p>ORDER NUMBER</p> : {props.newOrder && props.newOrder.order._id}</span>
          <span><p>DATE & Time</p> : {props.newOrder && props.newOrder.order.createdAt}</span>
          <span>
            <p>TOTAL</p> : {props.newOrder && props.newOrder.order.totalPrice} <strong className="crncy">PKR</strong>
          </span>
          <span>
            <p>PAYMENT METHOD </p>:{" "}
            {props.newOrder && props.newOrder.order.paymentInfo.id}
          </span>
        </div>
        <Link
          to={
            isAuthenticated
              ? `/course/order/${props.newOrder.order._id}`
              // : props.newOrder
              //   ? `/course/order/${props.newOrder.order._id}`
                : "/login"
          }
          className="btn_primary"
        >
          View Orders
        </Link>
      </div>
      ) : <Link
          to={
            isAuthenticated
              ? "/coursehistory"
                : "/login"
          }
          className="btn_primary"
        >
          View Orders
        </Link>
      }
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  newOrder: state.newOrder.order,
});
export default connect(mapStateToProps)(OrderSuccess);
