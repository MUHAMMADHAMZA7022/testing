import React, { Fragment, useState } from "react";
import "./Checkout.css";
import CheckoutSteps from "../Cart/checkoutsteps";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { savecheckout } from "../../../redux/action/cartAction";

function Checkout() {
  let history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartItems, checkout } = useSelector((state) => state.cart);
  const [name, setName] = useState(checkout.name);
  const [university, setuniversity] = useState(checkout.university);
  const [department, setdepartment] = useState(checkout.department);
  const [phoneNo, setPhoneNo] = useState(checkout.phoneNo);
  const [email, setemail] = useState(checkout.email);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 11 || phoneNo.length > 11) {
      alert.error("Phone Number should be 11 digits Long");
      return;
    }
    dispatch(
      savecheckout({ name, email, university, department, phoneNo })
    );
    history("/order/confirm");
  };

  return (
    <Fragment>
      <CheckoutSteps activeStep={0} />
      <div className="checkout">
        <h1>Checkout</h1>
        <div className="checkout_holder">
          <div className="stdInfo">
            <p>Please fill the below form with exact requirements*</p>
            <form
              className="stdInfo_form"
              encType="multipart/form-data"
              onSubmit={shippingSubmit}
            >
              <div className="stdForm_holder">

                <div className="chk_formHolder">

                  <div class="form__group field">
                    <input
                      type="text"
                      className="form__field"
                      placeholder="Name"
                      name="name"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label for="name" className="form__label">
                      Name
                    </label>
                  </div>
                  <div class="form__group field">
                    <input
                      type="email"
                      className="form__field"
                      placeholder="Email"
                      name="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                    <label for="email" className="form__label">
                      Email
                    </label>
                  </div>
                  <div class="form__group field">
                    <input
                      type="text"
                      className="form__field"
                      placeholder="University Name"
                      name="uniName"
                      id="uniName"
                      required
                      value={university}
                      onChange={(e) => setuniversity(e.target.value)}
                    />
                    <label for="uniName" className="form__label">
                      University Name
                    </label>
                  </div>
                  <div class="form__group field">
                    <input
                      type="text"
                      className="form__field"
                      placeholder="Department"
                      name="department"
                      id="department"
                      required
                      value={department}
                      onChange={(e) => setdepartment(e.target.value)}
                    />
                    <label for="department" className="form__label">
                      Department
                    </label>
                  </div>
                  <div class="form__group field lastField">
                    <input
                      type="number"
                      className="form__field"
                      placeholder="Phone No"
                      name="phoneNo"
                      id="phoneNo"
                      required
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                    <label for="phoneNo" className="form__label">
                      Phone No
                    </label>
                  </div>

                </div>

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
                  </div>
                  <button type="submit" className="btn_primary">
                    Complete Checkout
                  </button>
                </div>

              </div>

            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Checkout;
