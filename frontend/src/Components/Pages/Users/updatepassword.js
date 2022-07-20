import "./UpdateProfile.css";
import React, { Fragment, useState, useEffect } from "react";

// import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERROR, updatePassword } from "../../../redux/action/useraction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../../redux/Constant/userconstant";
import { useNavigate } from "react-router-dom";
const UpdatePassword = () => {
  let history = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated } = useSelector((state) => state.profile);

  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [conformpassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldpassword", oldpassword);
    myForm.set("newpassword", newpassword);
    myForm.set("conformpassword", conformpassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERROR());
    }
    if (isUpdated) {
      alert.success("Password Updated Successfully");
      history("/profile");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);
  return (
    <Fragment>
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <Fragment>
        <div className="updateProfileContainer">
          <div className="LoginSignUpBox">
            <div className="section_heading">
              <div className="homeHeading">
                <h2>Update Password</h2>
              </div>
            </div>
            <form className="signinForm" onSubmit={updatePasswordSubmit}>
              <div class="form__group field">
                <input
                  className='form__field'
                  type="password"
                  placeholder="Old Password"
                  required
                  value={oldpassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  id="opassword"
                />
                <label for="opassword" className="form__label">Old Password</label>
              </div>
              <div class="form__group field">
                <input
                  className='form__field'
                  type="password"
                  placeholder="New Password"
                  required
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="newpassword"
                />
                <label for="newpassword" className="form__label">New Password</label>
              </div>
              <div class="form__group field">
                <input
                  className='form__field'
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={conformpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="copassword"
                />
                <label for="copassword" className="form__label">Confirm Password</label>
              </div>

              <div className="row group_field e_btn">
                <button className="btn_primary" type="submit" value="Change">
                  UPDATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
      {/* )} */}
    </Fragment>
  );
};

export default UpdatePassword;
