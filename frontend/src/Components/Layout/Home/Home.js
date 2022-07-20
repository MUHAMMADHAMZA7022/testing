import React, { Fragment, useEffect } from "react";
// import slide1 from '../../../images/bimg1.jpg';
import bg1 from '../../../images/sctc1.jpg';
// import bg2 from '../../../images/slide-img-2.jpg';
// import bg3 from '../../../images/slide-img-3.jpg';
// import bg4 from '../../../images/slide-img-4.jpg';

import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import FaxIcon from '@mui/icons-material/Fax';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import "./Home.css";
import { Link } from "react-router-dom";
// import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
// import SearchIcon from '@mui/icons-material/Search';

import Courseloader from "../Loader/cloader";
import Eventsloader from "../Loader/eLoader";

import CourseCard from "../../Pages/Course/CourseCard";
import EventCard from "../../Pages/Event/EventCard";
import { CLEAR_ERROR, getProduct } from "../../../redux/action/courseaction";
import { CLEAR_ERROR_EVENT, getEvent } from "../../../redux/action/eventaction";
import { useSelector, useDispatch } from "react-redux";
// import Loader1 from "../Loader/Courseloader";
import { useAlert } from "react-alert";
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import BannerCard from "../../Pages/Event/baneercard";

function Home() {
  // const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, courses, error } = useSelector((state) => state.courses);
  const { latestevent, error: eventerror } = useSelector((state) => state.events);

  // const { event } = useSelector((state) => state.events);



  // const [cateogery, setcateogery] = useState("");
  // const [keyword, setKeyword] = useState("");
  // const cateogories = ["Biology", "Statical", "Physics",];
  // const searchSubmitHandler = (e) => {
  //   e.preventDefault();
  //   if (keyword.trim()) {
  //     history(`/${keyword}`);
  //   } else {
  //     history("/");
  //   }
  // };
  useEffect(() => {
    if (error) {
      alert.error(error);

      dispatch(CLEAR_ERROR);
    }
    if (eventerror) {
      alert.error(eventerror);

      dispatch(CLEAR_ERROR_EVENT);
    }
    dispatch(getEvent());
    dispatch(getProduct());
  }, [alert, dispatch, error, eventerror]);

  return (
    <Fragment>
      <div className="home_wrapper">
        {/* Banner Section */}
        <div className="banner">
          <div className="banner_img">
            <img src={bg1} alt="slide1" />

            {/* <img src={event.images.url} alt="slide1" /> */}

          </div>
          <div className="banner_content">
            {/* <h2>Starting in september 2016?</h2>
            <p>
              Read our guide to new find out everything you need to know about
              registering as a student, getting to us, welcome events and
              setting in.
            </p>
            <Link to="#" className="btn_primary">
              Check Events
            </Link> */}
            {latestevent &&
              latestevent
                .slice(0, 1)
                .map((event) => (
                  <BannerCard key={event._id} event={event} />

                ))
            }


          </div>
        </div>
        {/* Discover Section */}
        <section className="discover">
          <div className='contact_boxes grid'>
            <div className='ct_box'>
              <div className='ct_icon'>
                <MapsHomeWorkIcon />
              </div>
              <div className='ct_text'>
                <Link className="ct_title" to={"/contact"}>Maps & Location</Link>
                <p>Come and garb your knowledge whenever you want.</p>
              </div>
            </div>
            <div className='ct_box'>
              <div className='ct_icon'>
                <FaxIcon />
              </div>
              <div className='ct_text'>
                <Link className="ct_title" to={"/events"}>Our Workshops</Link>
                <p>See what's on at our great Knowledge Hub.</p>
              </div>
            </div>
            <div className='ct_box'>
              <div className='ct_icon'>
                <MarkEmailUnreadIcon />
              </div>
              <div className='ct_text'>
                <Link className="ct_title" to={"/about"}>Heritage</Link>
                <p>Learn more about SCTC and history.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Discover Section */}
        <section className="advertiseSection grid">
          <div className="advtHolder">
            <h2>Advertise Here</h2>
            <span><PanToolAltIcon /></span>
          </div>
        </section>

        {/* This is course card loader styles */}
        {/* <section>
          <Courseloader />
        </section> */}



        {/* Find Courses Section */}
        {/* <section className='homeEvents grid'>
          <div className='section_heading grid'>
            <h1>Find Your Courses</h1>
          </div>
          <div className="find_course grid">
            <h2>Find a Course</h2>
            <div className="fCrs_cate">
              <h3>Browse Courses</h3>
              <ul className="unstyled">
                {
                  cateogories.map((cato) => (
                    <li
                      className="category-link"
                      key={cato}


                      onClick={() => setcateogery(cato)}

                    ><span><ArrowRightAltIcon /></span><Link to={"#"}>
                        {cato}
                      </Link> </li>
                  ))}
                <li
                  className="category-link"


                  onClick={() => dispatch(getProduct())}

                ><span><ArrowRightAltIcon /></span><Link to={"#"}>
                    ALL
                  </Link> </li>
              </ul>
            </div>
            <div className="find_coursesFormHolder">
              <form className="find_coursesForm" onClick={searchSubmitHandler}>
                <input type={"text"} placeholder={"I want to study"} onChange={(e) => setKeyword(e.target.value)} />
                <button><SearchIcon />Search Courses</button>
              </form>
            </div>
          </div>
        </section> */}
        <section className="homeCourses grid">
          <div className="section_heading">
            <h1>Latest Courses to join</h1>
          </div>

          {loading === false && courses ? (
            courses && courses
              .slice(0, 6)
              .map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
          ) : (
            <Courseloader />
          )}

          {/* <div className='hc_holder'>
            <div className='hc_card'>
              <div className='hc_img'>
                <img src={bg2} alt='#' />
              </div>
              <div className='hc_content'>
                <h2>Learn Python Programming Masterclass</h2>
                <p>The lorem ipsum dolor sit amet by using the lorem ipsum dolor sit amet.</p>
                <div className='hc_action'>
                  <Link to={"#"} className='red_link'>Join now</Link>
                  <Link to={"#"}>View Details</Link>
                </div>
              </div>
            </div>
          </div> */}

          <div className="section_btn">
            <Link to="/courses" className="btn_primary">
              View All
            </Link>
          </div>
        </section>


        {/* This is Events card loader styles */}
        {/* <section>
          <Eventsloader />
        </section> */}


        {/* Home Events Section */}
        <section className='homeEvents grid'>
          <div className='section_heading'>
            <h1>Upcoming Workshops</h1>
          </div>
          {latestevent ? (
            latestevent
              .slice(0, 3)
              .map((event) => (
                <EventCard key={event._id} event={event} />

              ))
          ) : (
            <Eventsloader />
          )}
          {/* <div className='ev_holder'>
            <div className='ev_card'>
              <div className='ev_img'>
                <img src={bg3} alt='#' />
              </div>
              <div className='ev_content'>
                <div className='ev_date'>
                  <strong>12</strong>
                  <span className='uppercase'>SEP</span>
                </div>
                <div className='ev_content_holder'>
                  <div className='ev_title'>
                    <Link to={"#"}>
                      <h3>Pure Land: Immortals in Chinese Art.</h3>
                    </Link>
                  </div>
                  <div className='ev_time'>
                    <span>7:30am</span>
                    <span>-</span>
                    <span>11:00am</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className='section_btn'>
            <Link to='/events' className='btn_primary'>View All</Link>
          </div>
        </section>
      </div>
    </Fragment>
  );
}

export default Home;
