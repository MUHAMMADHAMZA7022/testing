import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
// import MetaData from "../Layout/Metadata";
// import Loader from "../Layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import { useDispatch } from "react-redux";
import { Logout } from "../../../redux/action/useraction";
import { useAlert } from "react-alert";
const Profile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  let history = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  function logoutUser() {

    dispatch(Logout());
    alert.success("Logout Successfully");
  }

  useEffect(() => {
    if (isAuthenticated === false) {
      history("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <Fragment>
        {/* <MetaData title={`${user.name}'s Profile`} /> */}

        <div className="section_heading">
          <div className="homeHeading">
            <h2>My Profile</h2>
          </div>
        </div>
        <div className="profileContainer">
          <div className="proCont">
            <div className="profC_holder">
              <div>
                <h4>Full Name</h4>
                <p>{user&&user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user&&user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user&&user.createdAt).substr(0, 10)}</p>
              </div>
            </div>
            <div className="profC_holder">
              <div>
                <Link className="btn_primary" to="/coursehistory">
                  Course History
                </Link>
                <Link className="btn_primary" to="/password/update">
                  Change Password
                </Link>
                <button className="btn_primary" onClick={logoutUser}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
      {/*  )} */}
    </Fragment>
  );
};

export default Profile;
