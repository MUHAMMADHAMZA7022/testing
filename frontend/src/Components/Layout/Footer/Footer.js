import React, { Fragment,useState,useEffect } from 'react';
import './Footer.css';
import logo from '../../../images/sctc_logo.png'
import BusinessIcon from '@mui/icons-material/Business';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SendIcon from '@mui/icons-material/Send';
import { useSelector, useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import {

    newsletter,
    CLEAR_ERROR,
    
  } from "../../../redux/action/useraction";
  import { useAlert } from "react-alert";
import {  NEWSLETTER_RESET } from "../../../redux/Constant/userconstant";

import { Link } from 'react-router-dom';

function Footer() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, isnews } = useSelector((state) => state.newsletter);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  const newsletterSubmitHandler = (e) => {
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
 


      dispatch(newsletter(myForm));
      setname("")
      setemail("")
   
  };

  useEffect(() => {
      if (error) {
          alert.error(error);
          dispatch(CLEAR_ERROR());
      }

      if (isnews) {
        alert.success("Thanks for Subscribing us.");
        dispatch({
          type: NEWSLETTER_RESET,
        });
      }

       
    }, [dispatch, isnews,alert, error,]);
  return (
    <Fragment>
      <div className='footer_wrapper'>
        <div className='footer_holder grid'>
          <div className='ft_block'>
            <div className='footerlogo_holder'>
              <img src={logo} alt="footer logo" />
            </div>
            <p>Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,</p>
          </div>
          <div className='ft_block bg2'>
            <div className='ft_title'>
              <h2>Contact Details</h2>
            </div>
            <div className='ft_list'>
              <ul className='unstyled'>
                <li>
                  <span><BusinessIcon /></span>
                  <address>4048 Mutton Town Road</address>
                </li>
                <li>
                  <span><LocalPhoneIcon /></span>
                  <a href="tel:+923209455811">+92 320 9455811</a>
                </li>
                <li>
                  <span><EmailIcon /></span>
                  <a href="email:info@sctc.com.pk">info@sctc.com.pk</a>
                </li>
              </ul>
            </div>
          </div>
          <div className='ft_block'>
            <div className='ft_title'>
              <h2>Social Links</h2>
            </div>
            <div className='ft_list social_links'>
              <ul className='unstyled'>
                <li>
                  <Link to={"#"}>
                    <FacebookIcon />
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <LinkedInIcon />
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <InstagramIcon />
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <WhatsAppIcon />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='ft_block'>
            <div className='ft_title'>
              <h2>Newsletter</h2>
            </div>
            <div className='ft_list newsletter'>
              <form onSubmit={newsletterSubmitHandler }>
                <input placeholder='Name' type={"text"} required  value={name} onChange={(e) => setname(e.target.value)}/>
                <input placeholder='Email' type={"email"} required  value={email} onChange={(e) => setemail(e.target.value)}/>
                {
              loading === true ? (<LoadingButton
                loading
                loadingPosition="center"
                variant="outlined"
              >
              Subscribe
              </LoadingButton>) : (
                <button type='submit'>
                  <span><SendIcon /></span>
                  Subscribe
                </button>

              )
            }
              
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Footer