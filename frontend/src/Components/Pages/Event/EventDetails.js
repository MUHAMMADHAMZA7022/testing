
import bg3 from '../../../images/slide-img-3.jpg';
// import bg2 from '../../../images/slide-img-2.jpg';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import React, { Fragment, useEffect } from "react";
// import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
    getProductDetails,

    CLEAR_ERROR_EVENT,
} from "../../../redux/action/eventaction";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import './EventDetails.css';
import { addItemsToCartWork } from "../../../redux/action/cartAction";
function EventDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { event, error } = useSelector((state) => state.eventDetails);
    const addToCartHandler = () => {
  
        dispatch(addItemsToCartWork(event._id));
        alert.success("Item Added To Cart");
      };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(CLEAR_ERROR_EVENT());
        }



        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert]);

    // const [isActive, setActive] = useState("false");
    // const ToggleClass = () => {
    //     setActive(!isActive);
    // };

    return (
        <Fragment>
            <div className='eventsDetails'>
                {/* Single Page Banner */}
                <div className='evn_banner'>
                    <div className='evn_bannerImg'>
                        <img src={bg3} alt="banner" />
                    </div>
                    <div className="evnBanner_content">
                        <h2>Workshop Detailed</h2>
                    </div>
                </div>
                {/* Single Page Course Details */}
                <div className='evnDetailsContent grid'>
                    <div className='event_img'>
                        <img src={event?.images?.url} alt="courseImg" />
                    </div>
                    <div className='evnDetail_title'>
                        <h2>{event.name}</h2>
                    </div>
                    <div className='evnDetail_desp'>
                        <p>{event.description}</p>
                    </div>
                    <div className='evn_time'>
                        <h2>Start Time</h2>
                        <span className='evnt_date'><CalendarMonthOutlinedIcon />{String(event.startdate).substr(0, 8)}</span>
                        <span className='evnt_time'><AccessTimeIcon />{String(event.startdate).substr(10, 4)}{String(event.startdate).substr(17, 11)}</span>
                        <h2>Ending Time</h2>
                        <span className='evnt_date'><CalendarMonthOutlinedIcon />{String(event.enddate).substr(0, 8)}</span>
                        <span className='evnt_time'><AccessTimeIcon />{String(event.enddate).substr(10, 4)}{String(event.enddate).substr(17, 11)}</span>
                        <h2>Workshop Location</h2>
                        <span className='evnt_location'><LocationOnIcon />{event.location}</span>
                    </div>
                    <div className='evnDetail_action'>
                        <h2>Workshop Action</h2>
                        <Link to="#" onClick={() => addToCartHandler()}><TurnedInIcon />Join Workshop</Link>



                        {/* <Link to="#" onClick={ToggleClass}><TurnedInIcon />Join Now</Link>
                        <div className={isActive ? "evn_box" : null}>
                            <div className='eventJoin_holder'>
                                <p className='capitalize'>to join event please fill the below information*</p>
                                <form className='eventJoin_form'>
                                    <input type={"text"} placeholder="Name" />
                                    <input type={"email"} placeholder="Email" />
                                    <input type={"number"} placeholder="Phone No" />
                                    <button className='btn_primary'>Join</button>
                                </form>
                            </div>
                        </div> */}
                    </div>
                    {/* event joined list */}
                    {/* <div className='eventJoined'>
                        <h1>List of Members who joined the Event.</h1>
                        <table className='eventJoinedTable' border={1} style={{width: "100%"}} >
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                            <tr>
                                <td>Syed Saim</td>
                                <td>syedsaim40@gmail.com</td>
                                <td>03209455811</td>
                            </tr>
                        </table>
                    </div> */}
                </div>
            </div>
        </Fragment>
    )
}

export default EventDetails