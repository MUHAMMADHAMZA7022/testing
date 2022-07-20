import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "../Cart/checkoutsteps";
import { useSelector, useDispatch, connect } from "react-redux";
import { useAlert } from "react-alert";
import { createOrder, clearErrors } from "../../../redux/action/orderaction";
import { RESETCart } from "../../../redux/action/cartAction";

import "./payment.css";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  let history = useNavigate()
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const alert = useAlert();
  const [selectedval, setselectedval] = React.useState("");
  const { checkout, cartItems } = useSelector((state) => state.cart);

  const { error } = useSelector((state) => state.newOrder);

  const order = {
    checkout,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    totalPrice: orderInfo.totalPrice,
    paymentInfo: {
      id: selectedval,
    },
  };
  const handlechange = (e) => {
    setselectedval(e.target.value);
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(createOrder(order)).then(function (result) {
    });
    dispatch(RESETCart())
    history("/success");
    
  
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  
  }, [dispatch, error,history, alert]);

  return (
    <Fragment>
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <div className="order_info">
          <div className="section_heading">
            <div className="homeHeading">
              <h2>
                <b>Payment Info</b>
              </h2>
            </div>
          </div>
          <div className="ftotal_prc">
            <span>
              <b>TOTAL</b>
            </span>
            <span>
              <b>PKR{orderInfo.totalPrice}</b>
            </span>
          </div>
          <div className="payment_accordian">
            <h3>Please check one method how do you want to pay and checkout the given details of Accounts*</h3>
            <form action="submit">
              <div className="pa_box">
                <div className="pa_text">
                  <label className="lShow">BANK TRANSFER PAYMENT</label>
                  <input
                    type="radio"
                    id="demo"
                    name="pa_value"
                    checked={selectedval === "BANK  PAYMENT"}
                    onChange={handlechange}
                    value="BANK  PAYMENT"
                  />
                  <label for="demo" className="pa_lbl">
                    <p>
                      <span>Payment Details:</span>
                      <span>Bank Title : Azeem Mehmood</span>
                      <span>Bank Name : Meezan Bank</span>
                      <span>Bank Account #: 09050104237471</span>
                      <span>IBAN #: PK27 MEZN 0009 05014237471</span>
                    </p>
                    <p>
                      Please Send transaction number or screenshot of receipt to
                      email: admin@smarteshop.pk or whatsapp number:
                      0331-5865152
                    </p>
                  </label>
                </div>
              </div>
              <div className="pa_box">
                <div className="pa_text">
                  <label className="lShow">
                    EASY PAISA & JAZZCASH TRANSFER
                  </label>
                  <input
                    type="radio"
                    id="demo"
                    name="pa_value"
                    checked={selectedval === "EASY PAISA & JAZZCASH"}
                    value="EASY PAISA & JAZZCASH"
                    onChange={handlechange}
                  />
                  <label for="demo" className="pa_lbl">
                    <p>
                      <span>Payment Details:</span>
                      <span>EasyPaisa Account : 03455865152</span>
                      <span>Jazzcash Account : 03135865152</span>
                      <span>Acounts Holder Name : Azeem Mehmood</span>
                    </p>
                    <p>
                      Please Send transaction number or screenshot of receipt to
                      email: admin@smarteshop.pk or whatsapp number:
                      0331-5865152
                    </p>
                  </label>
                </div>
              </div>

            </form>

            {/* <Collapsible
              trigger="Get in Touch"
              className="accordian_footer hide_footer"
            >
              <div className="mf_box">
                <address>
                  VASL Wearhouse 2-Km, Main G.T Road, Off to Wireless Colony Besides
                  University of Engineering and Technology, Lahore.
                </address>
                <div className="mail_link">
                </div>
                <div className="mail_link">
                  <span>+92(0)3 209-455-811</span>
                </div>
              </div>
            </Collapsible> */}
          </div>
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <input
              type="submit"
              className="paymentFormBtn"
              disabled={!selectedval}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  newOrder: state,
});
export default connect(mapStateToProps)(Payment);
