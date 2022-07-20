import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminProduct,
  deleteProduct,
  CLEAR_ERROR_EVENT,
} from "../../../redux/action/eventaction";
import { useAlert } from "react-alert";
import Sidebar from "./Sidebar";
import Loader from "../../Layout/Loader/loader";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { DELETE_EVENT_RESET } from "../../../redux/Constant/eventconstant";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const Products = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const { latestevent, error,} = useSelector((state) => state.events);
 
let history=useNavigate();


  const { error: deleteError, isDeleted ,loading} = useSelector(
    (state) => state.event
  );

  const deleteProductHandler = (id) => {
    confirmAlert({
      title: ' Delete',
      message: 'Are you sure to delete this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            loading===true?(<Loader />):(dispatch(deleteProduct(id)));
          }   
        },
        {
          label: 'No',
          onClose: () => {}
        }
      ]
    });

  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERROR_EVENT());
    }
    
    if (deleteError) {
      alert.error(deleteError);
      dispatch(CLEAR_ERROR_EVENT());
    }

    if (isDeleted) {
      alert.success("Workshops Deleted Successfully");
      history("/all/events");
      dispatch({ type: DELETE_EVENT_RESET });
      
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert,error,deleteError, history, isDeleted]);

  return (
    <Fragment>
      <div className="dashboard_holder students">
        <div className="dSidebar">
          <Sidebar />
        </div>
        <div className="dashboard_content">
          <h1>All Workshops</h1>
          {latestevent && latestevent ?(
            latestevent.map((event,key) => 
              <div className="courses_holder"  key={key} course={event}>
              <div className="course_card"   >
                <div className="cr_img">
                  <img  src={event.images.url} alt="event_image" />
                </div>
                <div className="crs_content">
                  <div className="crs_title">
                    <h2 >{event.name}</h2>
                  </div>
                  <div className="crs_desp">
                    <p >{event.description} </p>
                  </div>
                  <div className="crs_action">
                    <Button className="btn_primary" onClick={() =>
                        deleteProductHandler(event._id)
                      }>
                      Delete
                    </Button>
                  
                    <Link className="btn_primary" to={`/updateevent/${event._id}`}>
                      Update
            </Link>
                  </div>
                </div>
              </div>
            </div>
            )
          
          ):(<Loader/>)}
          
        </div>
      </div>
    </Fragment>
  );
};

export default Products;
