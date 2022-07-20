import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CLEAR_ERROR,
  getAdminProduct,
  deleteProduct,
} from "../../../redux/action/courseaction";
import { useAlert } from "react-alert";
import Sidebar from "./Sidebar";
import Loader from "../../Layout/Loader/loader";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { DELETE_COURSE_RESET } from "../../../redux/Constant/courseconstant";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const Products = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const { course, error, } = useSelector((state) => state.courses);

  let history = useNavigate();


  const { error: deleteError, isDeleted, loading } = useSelector(
    (state) => state.course
  );

  const deleteProductHandler = (id) => {
    confirmAlert({
      title: ' Delete',
      message: 'Are you sure to delete this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            loading === true ? (<Loader />) : (dispatch(deleteProduct(id)));
          }
        },
        {
          label: 'No',
          onclose: () => { }
        }
      ]
    });

  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERROR());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(CLEAR_ERROR());
    }

    if (isDeleted) {
      alert.success("Course Deleted Successfully");
      history("/all/course");
      dispatch({ type: DELETE_COURSE_RESET });

    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  return (
    <Fragment>
      <div className="dashboard_holder students">
        <div className="dSidebar">
          <Sidebar />
        </div>
        <div className="dashboard_content">
          <h1>All Courses</h1>
          {course && course ? (
            course.map((course, key) =>
              <div className="courses_holder" key={key} course={course}>
                <div className="course_card"   >
                  <div className="cr_img">
                    <img src={course.images.url} alt="course_image" />
                  </div>
                  <div className="crs_content">
                    <div className="crs_title">
                      <h2 >{course.name}</h2>
                    </div>
                    <div className="crs_desp">
                      <p >{course.description} </p>
                    </div>
                    <div className="crs_action">
                      <Button className="btn_primary" onClick={() =>
                        deleteProductHandler(course._id)
                      }>
                        Delete
                      </Button>

                      <Link className="btn_primary" to={`/updatecourse/${course._id}`}>
                        Update
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )

          ) : (<Loader />)}

        </div>
      </div>
    </Fragment>
  );
};

export default Products;
