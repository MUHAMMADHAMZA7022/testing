
import bg3 from '../../../images/slide-img-3.jpg';
// import bg1 from '../../../images/slide-img-1.jpg';
import { Link } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import ShareCourse from './ShareCourse';

import './CourseDetails.css';
import React, { Fragment, useEffect, } from "react";
// import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
    getProductDetails,

    CLEAR_ERROR,
} from "../../../redux/action/courseaction";
import { addItemsToCart } from "../../../redux/action/cartAction";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

// import Loader from "../Layout/Loader/Loader";
// import Imageload from "../Layout/Loader/imageload";
// import { addItemsToCart, FavouriteToCart } from "../../redux/action/cartAction";
function CourseDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    const alert = useAlert();
    const { course, error } = useSelector((state) => state.courseDetails);
    console.log(course)
    const addToCartHandler = () => {
  
      dispatch(addItemsToCart(course._id));
      alert.success("Item Added To Cart");
    };

  
  
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(CLEAR_ERROR());
        }



        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert]);
    return (
        <Fragment>
            <div className='courseDetails'>
                {/* Single Page Banner */}
                <div className='crs_banner'>
                    <div className='crs_bannerImg'>
                        <img src={bg3} alt="banner" />
                    </div>
                    <div className="crsBanner_content">
                        <h2>Course Detailed</h2>
                    </div>
                </div>
                {/* Single Page Course Details */}

                <div className='crsDetailsContent grid' >

                    <div className='course_img'>
                        <img src={course?.images?.url} alt="courseImg" />
                    </div>
                    <div className='crsDetail_title'>
                        <h2>{course.name}</h2>
                    </div>
                    <div className='crsDetail_desp'>
                        <p>{course.description}</p>
                    </div>
                    <div className='csr_instructor'>
                        <h2>Course instructor</h2>
                        <h3 className='ins_name'>{course.instructor}</h3>
                        <span className='specialized'>{course.instructor_field}</span>
                        <p className='ins_bio'>{course.instructor_bio}</p>
                    </div>
                    <div className='crsDetail_action'>
                        <h2>Course Details</h2>
                        <span className='dur_time'><AccessTimeIcon />{course.duration}</span>
                        <Link to="#" onClick={() => addToCartHandler()}><AddShoppingCartIcon />Buy Now</Link>
                        <span className='course_price'>
                            {course.price}
                            <span className='course_currency'>PKR</span>
                        </span>
                        <span className='share_link red_link' title='share course'>
                            <ShareCourse />
                        </span>
                    </div>
                </div>



            </div>
        </Fragment>
    )
}

export default CourseDetails