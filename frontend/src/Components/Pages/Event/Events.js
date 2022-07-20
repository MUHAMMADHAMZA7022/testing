import React, { Fragment, useEffect } from "react";
import './Events.css'
import bg3 from '../../../images/slide-img-3.jpg';

import EventCard from "../../Pages/Event/EventCard";
import { CLEAR_ERROR_EVENT, getEvent } from "../../../redux/action/eventaction";
import { useSelector, useDispatch } from "react-redux";
import Loader1 from "../../Layout/Loader/loader";
import { useAlert } from "react-alert";
function Events() {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, latestevent, error: eventerror } = useSelector((state) => state.events);
  useEffect(() => {

    if (eventerror) {
      alert.error(eventerror);

      dispatch(CLEAR_ERROR_EVENT);
    }
    dispatch(getEvent());
  }, [alert, dispatch, eventerror]);
  return (
    <Fragment>

      <div className="events">
        {/* Single Page Banner */}
        <div className='crs_banner'>
          <div className='crs_bannerImg'>
            <img src={bg3} alt="banner" />
          </div>
          <div className="crsBanner_content">
            <h2>All Workshops</h2>
          </div>
        </div>
   
          <div className="events_holder grid">
          {loading === false&&latestevent ? (
            latestevent
              .map((event) => (
                <EventCard key={event._id} event={event} />
              ))
          ) : (
            <Loader1 />
          )}
        </div>
      
      </div>
    </Fragment>
  )
}

export default Events