import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminProduct,
  deleteProduct,
  CLEAR_ERROR_SERVICE,
} from "../../../redux/action/serviceaction";
import { useAlert } from "react-alert";
import Sidebar from "./Sidebar";
import Loader from "../../Layout/Loader/loader";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { DELETE_SERVICE_RESET } from "../../../redux/Constant/serviceconstant";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const Products = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const { latestservice, error,} = useSelector((state) => state.services);
 
let history=useNavigate();


  const { error: deleteError, isDeleted ,loading} = useSelector(
    (state) => state.service
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
      dispatch(CLEAR_ERROR_SERVICE());
    }
    
    if (deleteError) {
      alert.error(deleteError);
      dispatch(CLEAR_ERROR_SERVICE());
    }

    if (isDeleted) {
      alert.success("SERVICE Deleted Successfully");
      history("/all/services");
      dispatch({ type: DELETE_SERVICE_RESET });
      
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
          <h1>All Services</h1>
          {latestservice && latestservice ?(
            latestservice.map((service,key) => 
              <div className="courses_holder"  key={key} course={service}>
              <div className="course_card"   >
                <div className="cr_img">
                  <img  src={service.images.url} alt="service_image" />
                </div>
                <div className="crs_content">
                  <div className="crs_title">
                    <h2 >{service.name}</h2>
                  </div>
                  <div className="crs_desp">
                    <p >{service.description} </p>
                  </div>
                  <div className="crs_action">
                    <Button className="btn_primary" onClick={() =>
                        deleteProductHandler(service._id)
                      }>
                      Delete
                    </Button>
                  
                    <Link className="btn_primary" to={`/updateservice/${service._id}`}>
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
