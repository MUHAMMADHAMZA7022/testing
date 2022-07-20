import React, { Fragment, useEffect, useState } from "react";
// import MetaData from "../Layout/Metadata";
import { Link, useParams } from "react-router-dom";
import { Typography } from '@mui/material';
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  emailOrder,
  clearErrors,
  updateOrder,
} from "../../../redux/action/orderaction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Layout/Loader/loader";
import Loader1 from "../../Layout/Loader/Courseloader";
import { useAlert } from "react-alert";
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { UPDATE_ORDER_RESET } from "../../../redux/Constant/orderconstant";
import "./processorder.css";
const ProcessOrder = ({ match }) => {
  const id = useParams().id;
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const { loading: load, error: emailerror, isorder } = useSelector((state) => state.emailorder);


  const [email, setemail] = useState("");
  const [link, setlink] = useState("");


  const emailOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    myForm.set("link", link);

    dispatch(emailOrder(myForm));
    setemail("")
    setlink("")




  };
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (emailerror) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isorder) {
      alert.success("Email Send Successfully");
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, isorder, emailerror, id, isUpdated, updateError]);

  return (
    <Fragment>
      {/* <MetaData title="Process Order" /> */}
      <div className="dashboard processOrder">
        <div className="dSidebar">
          <SideBar />
        </div>
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                // display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Checkout Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div className="pro_box">
                      <div className="proOrder_dtl">
                        <p>Name:</p>
                      </div>
                      <div className="proOrder_dtlSub">
                        <span>{order.user && order.checkout.name}</span>
                      </div>
                    </div>
                    <div className="pro_box">
                      <div className="proOrder_dtl">
                        <p>Email:</p>
                      </div>
                      <div className="proOrder_dtlSub">
                        <span>{order.user && order.user}</span>
                      </div>
                    </div>
                    <div className="pro_box">
                      <div className="proOrder_dtl">
                        <p>Phone:</p>
                      </div>
                      <div className="proOrder_dtlSub">
                        <span>
                          {order.checkout && order.checkout.phoneNo}
                        </span>
                      </div>
                    </div>
                    <div className="pro_box">
                      <div className="proOrder_dtl">
                        <p>University:</p>
                      </div>
                      <div className="proOrder_dtlSub">
                        <span>
                          {order.checkout && order.checkout.university}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Typography>Payment Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div className="pro_box">
                      <div className="proOrder_dtl">
                        <p
                          className={
                            order.paymentInfo &&
                              order.paymentInfo.status === "PAID"
                              ? "greenColor" : "redColor"


                          }
                        >
                          {order.paymentInfo &&
                            order.paymentInfo.status
                          }
                        </p>
                      </div>
                    </div>

                    <div className="pro_box">
                      <div className="proOrder_dtl">
                        <p>Amount:</p>
                      </div>
                      <div className="proOrder_dtlSub">
                        <span>{order.totalPrice && order.totalPrice}</span>
                      </div>
                    </div>
                    <div className="verification_status">
                      <h3>Payment Verification</h3>
                      <div className="proOrder_dtlSub">
                        <p
                          className={
                            order.orderStatus && order.orderStatus === "Verified"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.orderStatus && order.orderStatus}
                        </p>
                        <p
                          className={
                            order.orderStatus && order.orderStatus === "Verified"
                              ? "greenColor"
                              : "redColor"
                          }
                        >

                          {order.orderStatus && order.orderStatus === "Verified"
                            ? String(order && order.verifiedAt).substr(0, 10)
                            : null
                          }
                        </p>
                      </div>

                    </div>
                    {/* <div className="verification_status">
                        <h3> Verification Date</h3>
                        <div className="proOrder_dtlSub">
                          <p
                            className={
                              order.orderStatus && order.orderStatus === "Verified"
                                ? "greenColor"
                                : "redColor"
                            }
                          >
                         { order.orderStatus&& order.orderStatus === "Verified"
                                ?String(order&&order.verifiedAt).substr(0, 10)
                                : null
                            }
                          </p>
                        </div>
                      </div> */}
                  </div>

                  {/* <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <div className="proOrder_dtl">
                        <p
                          className={
                            order.orderStatus && order.orderStatus === "Pending"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.orderStatus && order.orderStatus}
                        </p>
                      </div>
                    </div>
                  </div> */}


                </div>
                <div className="confirmCartItems">
                  <Typography>Your Ordered Courses:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        item.course?(
                        <div key={item.course}>
                          <img src={item.image} alt="Course" />
                          <Link to={`/course/details/${item.course}`}>
                            {item.name}={" "}
                          </Link>{" "}
                          <span>
                            <b>PKR {item.price}</b>
                          </span>
                        </div>
                        ):( <div key={item.event}>
                          <img src={item.image} alt="Workshop" />
                          <Link to={`/event/details/${item.event}`}>
                            {item.name}={" "}
                          </Link>{" "}
                          <span>
                            <b>PKR {item.price}</b>
                          </span>
                        </div>)
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Verified" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Choose the Payment verification for the course*</h1>

                  <div>
                    <CurrencyRubleIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Payment Option</option>
                      {order.orderStatus === "Not Verified" && (
                        <option value="Verified">Verified</option>
                      )}

                      {/* {order.orderStatus === "Verified" && (
                        <option value="Delivered">Delivered</option>
                      )} */}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn_primary"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </button>
                </form>


              </div>
              {order.orderStatus === "Verified" ? (

                load === true ? (<Loader1 />) : (
                  <form className="sendLink_form" onSubmit={emailOrderSubmitHandler}>
                    <h2>Please enter the student's email address and file url to send*</h2>
                    <input required type={"email"} value={email} onChange={(e) => setemail(e.target.value)} placeholder="Enter Student Email" />
                    <input required type="url" value={link} onChange={(e) => setlink(e.target.value)} placeholder="Enter File Url" />
                    <button className="btn_primary">Send Url</button>
                  </form>
                )

              ) : (null)}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
