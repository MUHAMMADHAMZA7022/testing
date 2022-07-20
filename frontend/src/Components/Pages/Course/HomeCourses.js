// import evn1 from "../../../images/evn1.jpg";
import bg3 from "../../../images/slide-img-3.jpg";

// import { Link } from "react-router-dom";
import "./HomeCourses.css";

// import AccessTimeIcon from '@mui/icons-material/AccessTime';

import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_ERROR, getProduct } from "../../../redux/action/courseaction";
// import ploader from "../Layout/Loader/loader1";
import CourseCard from "./CourseCard";
// import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Loader1 from "../../Layout/Loader/loader";

// import Search from "./Search";
const cateogories = ["Biology", "Statical", "Physics", ""];
function HomeCourses() {
  const dispatch = useDispatch();
  let history = useNavigate();
  const [cateogery, setcateogery] = useState("");
  const [keyword, setKeyword] = useState("");
  const alert = useAlert();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/courses/${keyword}`);
    } else {
      history("/courses");
    }
  };

  const {
    courses,
    loading,
    error,
  } = useSelector((state) => state.courses);

  //let count = filterproductCount;
  console.log(cateogery)
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERROR());
    }
    dispatch(getProduct(keyword, cateogery));
  }, [dispatch, keyword, cateogery, alert, error]);

  return (
    <Fragment>
      <div className="eventsDetails">
        {/* Single Page Banner */}
        <div className="crs_banner">
          <div className="crs_bannerImg">
            <img src={bg3} alt="banner" />
          </div>
          <div className="crsBanner_content">
            <h2>Courses</h2>
          </div>
        </div>
        {/* Single Page Courses Content */}
        <div className="allCourses_content grid">
          {/* Search bar for search the entire courses */}
          <form className="crs_searchBar" onSubmit={searchSubmitHandler}>
            <ul className="unstyled filterCategories">
              <li className="ct_btn"  >
                Categories
                <ul className="unstyled ct_list">
                  <li
                    className="category-link"
                    onMouseEnter={() => dispatch(getProduct())}
                  >
                    ALL
                  </li>
                  {
                    cateogories.map((cato) => (
                      <li
                        className="category-link"
                        key={cato}
                        onMouseEnter={() => setcateogery(cato)}
                      >
                        {cato}
                      </li>
                    ))}

                </ul>
              </li>
            </ul>
            <input type="search"
              placeholder="Search a Courses ..."
              onChange={(e) => setKeyword(e.target.value)} />
            <button className="btn_primary" >Search</button>
          </form>
          {/* All courses cards for each course */}
          {/* <div className='allCourses_card'> */}

          {loading === false && courses ? (
            courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <Loader1 />
          )}
        </div>
      </div>
      {/* </div> */}
    </Fragment>
  );
}

export default HomeCourses;
