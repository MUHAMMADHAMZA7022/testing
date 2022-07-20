import React, { Fragment, useState, useEffect } from "react";
import "./SignUp.css";
import signUpImg from '../../../images/sctc2.jpg';

import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_ERROR,
  register,
} from "../../../redux/action/useraction";
import { Link, useNavigate } from "react-router-dom"

import { useAlert } from "react-alert";
function SignUp() {
  const { success, error, isAuthenticated } = useSelector((state) => state.user);
  let history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const registerDataChange = (e) => {
    let name, value;
    name = e.target.name; //name get kiya
    value = e.target.value; //value mili user jo likh rha
    setUser({ ...user, [name]: value });
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    let myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    dispatch(register(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERROR());
    }

    if (isAuthenticated) {

      history("/profile");

    }
  }, [dispatch, success, error, alert, history, isAuthenticated]);
  return (
    <Fragment>
      {/* Sign Up Form */}
      <div className='formHolder'>
        <div className="grid">
          <div className='signupHolder'>
            <h1>Sign Up</h1>
            <form className="signupForm" onSubmit={registerSubmit}>
              {/* Name */}
              <div class="form__group field">
                <input
                  className='form__field'
                  type='text'
                  placeholder="Name"
                  required
                  name='name'
                  value={name}
                  onChange={registerDataChange}
                />
                <label for="name" className="form__label">Name</label>
              </div>
              {/* Email */}
              <div class="form__group field">
                <input
                  className='form__field'
                  type='email'
                  placeholder="Email"
                  required
                  name='email'
                  value={email}
                  onChange={registerDataChange}
                />
                <label for="name" className="form__label">Email</label>
              </div>
              {/* Password */}
              <div class="form__group field">
                <input
                  className='form__field'
                  type='password'
                  placeholder="Password"
                  required
                  name='password'
                  value={password}
                  onChange={registerDataChange}
                />
                <label for="name" className="form__label">Password</label>
              </div>
              <div className="group_field">
                <button className='btn_primary' >Sign Up</button>
              </div>
              <Link to={"/login"} className="acc_link">Have an Account?</Link>
            </form>
          </div>
          <div className='signUpImg'>
            <img src={signUpImg} alt="sign up img" />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default SignUp