import bg3 from "../../../images/slide-img-3.jpg";
import "./Services.css";
import { Link } from "react-router-dom";
import React, { Fragment, useEffect } from "react";

import {
  CLEAR_ERROR_SERVICE,
  getService,
} from "../../../redux/action/serviceaction";
import { useSelector, useDispatch } from "react-redux";
import Loader1 from "../../Layout/Loader/loader";
import { useAlert } from "react-alert";

function Services() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    loading,
    latestservice,
    error: serviceerror,
  } = useSelector((state) => state.services);
  useEffect(() => {
    if (serviceerror) {
      alert.error(serviceerror);

      dispatch(CLEAR_ERROR_SERVICE);
    }
    dispatch(getService());
  }, [alert, dispatch, serviceerror]);
  return (
    <Fragment>
      <div className="services">
        {/* Single Page Banner */}
        <div className="crs_banner">
          <div className="crs_bannerImg">
            <img src={bg3} alt="banner" />
          </div>
          <div className="crsBanner_content">
            <h2>Our Services</h2>
          </div>
        </div>
        {/* Main Content */}
        <div className="service_cards">

          {loading === false && latestservice ? (
            latestservice.map((service, key) => (
              <div className="srvc_card" key={key} service={service}>
                <Link to={`/service/details/${service._id}`}>
                  <img
                    src={service?.images?.url}
                    alt="srvce img"
                    className="card__image"
                  />
                  <div className="card__overlay">
                    <div className="card__header">
                      <div className="card__header-text">
                        <h3 className="card__title">{service.name}</h3>
                      </div>
                    </div>
                    <p className="card__description">{service.description}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <Loader1 />
          )}
        </div>
      </div>

    </Fragment>
  );
}

export default Services;
