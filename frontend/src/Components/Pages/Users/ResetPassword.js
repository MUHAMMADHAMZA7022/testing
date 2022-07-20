import "./ForgetPassword.css";
import React, { Fragment, useState, useEffect } from "react";

// import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERROR, resetPassword } from "../../../redux/action/useraction";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
    const token = useParams();
    const history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, success } = useSelector(
        (state) => state.forgotPassword
    );

    const [password, setPassword] = useState("");
    const [confirmpassword, setConformPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmpassword", confirmpassword);

        dispatch(resetPassword(token, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(CLEAR_ERROR());
        }

        if (success) {
            alert.success("Password Updated Successfully");

            history("/login");
        }
    }, [dispatch, error, alert, history, success]);


    return (
        <Fragment>
            {/* Reset Form */}
            <div className='forgetformHolder'>
                <div className='forgetHolder'>
                    <h1>Reset Password</h1>
                    <form className="forgetForm" onSubmit={resetPasswordSubmit}>
                        {/* Password */}
                        <div class="form__group field">
                            <input
                                className='form__field'
                                type='password'
                                placeholder="Password"
                                autoComplete="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                id="password"
                            />
                            <label for="password" className="form__label">Password</label>
                        </div>
                        {/* Confirm Password */}
                        <div class="form__group field">
                            <input
                                className='form__field'
                                type='password'
                                placeholder="Confirm Password"
                                autoComplete="confirm password"
                                value={confirmpassword}
                                onChange={(e) => setConformPassword(e.target.value)}
                                required
                                id="cpassword"
                            />
                            <label for="cpassword" className="form__label">Confirm Password</label>
                        </div>
                        <div className="group_field">
                            <button className='btn_primary'>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ResetPassword