import "./Login.css";
import React, { Fragment, useState, useEffect } from "react";
import "./SignUp.css";
import logInImg from '../../../images/sctc3.jpg';
import { useDispatch, useSelector } from "react-redux";
import {

    CLEAR_ERROR,
    login,
} from "../../../redux/action/useraction";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

import { useAlert } from "react-alert";
function Login() {
    let history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { success, error, isAuthenticated } = useSelector((state) => state.user);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(CLEAR_ERROR());
        }

        if (isAuthenticated) {
            // alert.success(success);

            history("/profile");

        }
    }, [dispatch, success, error, alert, history, isAuthenticated]);
    return (
        <Fragment>
            {/* Login Form */}
            <div className='formHolder'>
                <div className="grid">
                    <div className='loginImg'>
                        <img src={logInImg} alt="loginImg" />
                    </div>
                    <div className='loginHolder'>
                        <h1>Log In</h1>
                        <form className="loginForm" onSubmit={loginSubmit}>
                            {/* Email */}
                            <div class="form__group field">
                                <input
                                    className='form__field'
                                    type='email'
                                    autoComplete="Email"
                                    placeholder="Email"
                                    name="email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                                <label for="name" className="form__label">Email</label>
                            </div>
                            {/* Password */}
                            <div class="form__group field">
                                <input
                                    className='form__field'
                                    type='password'
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                                <label for="name" className="form__label">Password</label>
                            </div>
                            <div className="group_field">
                                <button className='btn_primary' >Login</button>
                                <Link to={"/signup"} className="acc_link">Doesn't have an Account?</Link>
                                <Link to={"/forget"} className="acc_link">Forget your password?</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login