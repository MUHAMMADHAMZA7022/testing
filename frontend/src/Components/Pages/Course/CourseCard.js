import React, { Fragment, useEffect, } from 'react'
import { Link } from 'react-router-dom';
import { useAlert } from "react-alert";
import { CLEAR_ERROR } from "../../../redux/action/courseaction";
import { addItemsToCart } from "../../../redux/action/cartAction";
import { useDispatch, useSelector } from 'react-redux';
import { RWebShare } from "react-web-share";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

function Home({ course }) {
  const { error } = useSelector((state) => state.courseDetails);
  const alert = useAlert();
  const dispatch = useDispatch();
  const addToCartHandler = () => {

    dispatch(addItemsToCart(course._id));
    alert.success("Item Added To Cart");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERROR);
    }
  }, [dispatch, alert, error]);


  return (
    <Fragment>

      <div className='hc_holder'>
        <div className='hc_card'>
          <Link to={`/course/details/${course._id}`} className='hc_img'>
            <img src={course.images.url} alt='#' />
          </Link>
          <div className='hc_content'>
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <span className='course_price'>
              {course.price}
              <span className='course_currency'>PKR</span>
            </span>
            <div className='hc_action'>
              <Link to={"#"} className='red_link' onClick={() => addToCartHandler()}>Buy now</Link>
              <Link to={`/course/details/${course._id}`}>View Details</Link>

              <span className='share_link red_link' title='share course'>
                <RWebShare
                  data={{
                    url: `http://localhost:3000/course/details/${course._id}`,
                    title: "SCTC",
                  }}
                  onClick={() => console.log("Shared Successfully!")}
                >
                  <span><ShareOutlinedIcon /></span>
                </RWebShare>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Home