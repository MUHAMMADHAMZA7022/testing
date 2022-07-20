import React, { Fragment, useEffect, useState } from "react";
import './Contact.css'
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import FaxIcon from '@mui/icons-material/Fax';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { useSelector, useDispatch } from "react-redux";
import Loader1 from "../../Layout/Loader/Courseloader";
import {

    contactuser,
    CLEAR_ERROR,
    
  } from "../../../redux/action/useraction";
  import { useAlert } from "react-alert";
import { CONTACT_RESET } from "../../../redux/Constant/userconstant";
  
function Contact() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, iscontact } = useSelector((state) => state.contactuser);
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [subject, setsubject] = useState("");
    const [message, setmessage] = useState("");
    const contactSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("firstname", firstname);
        myForm.set("lastname", lastname);
        myForm.set("email", email);
        myForm.set("subject", subject);
        myForm.set("message", message);



        dispatch(contactuser(myForm));
        setfirstname("")
        setlastname("")
        setemail("")
        setsubject("")
        setmessage("")
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(CLEAR_ERROR());
        }

        if (iscontact) {
          alert.success("Message Send Successfully");
          dispatch({
            type: CONTACT_RESET,
          });
        }

         
      }, [dispatch, iscontact,alert, error,]);
    
    return (
        <Fragment>
            <div className='contactUs'>
                <div className='contact_boxes grid'>
                    <div className='ct_box'>
                        <div className='ct_icon'>
                            <MapsHomeWorkIcon />
                        </div>
                        <div className='ct_text'>
                            <h3>Our Location</h3>
                            <address>4048 Mutton Town Road,<br /> Lahore, Pakistan</address>
                        </div>
                    </div>
                    <div className='ct_box'>
                        <div className='ct_icon'>
                            <FaxIcon />
                        </div>
                        <div className='ct_text'>
                            <h3>Our Phone & Fax</h3>
                            <a href="tel:+923209455811">+92 320 9455811</a>
                            <a href="tel:+923209455811">+92 320 9455811</a>
                        </div>
                    </div>
                    <div className='ct_box'>
                        <div className='ct_icon'>
                            <MarkEmailUnreadIcon />
                        </div>
                        <div className='ct_text'>
                            <h3>Email</h3>
                            <a href="email:info@sctc.com.pk">info@sctc.com.pk</a>
                            <a href="email:info@sctc.com.pk">info@sctc.com.pk</a>
                        </div>
                    </div>
                </div>
                <h2>Get in touch with SCTC</h2>
                <div className='contactUs_holder grid'>
                    <div className='ourMap'>
                        <div className='map_holder'>
                            <iframe title='SCTC Map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217972.70283029746!2d73.97748862499998!3d31.3914304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919018a8ea548c1%3A0x4a52db69c2c814f!2sThe%20University%20of%20Lahore!5e0!3m2!1sen!2s!4v1656856582082!5m2!1sen!2s" width="600" height="450" style={{ border: "0px" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    <div className='contactUs_form'>
                        {loading === true ? (<Loader1 />) : (


                            <form onSubmit={contactSubmitHandler}>
                                <input type={"text"} placeholder="First Name" value={firstname} onChange={(e) => setfirstname(e.target.value)} />
                                <input type={"text"} placeholder="Last Name" value={lastname} onChange={(e) => setlastname(e.target.value)} />
                                <input type={"email"} placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} />
                                <input type={"text"} placeholder="Subject(Optional)" value={subject} onChange={(e) => setsubject(e.target.value)} />
                                <textarea placeholder='Write your message...' value={message} onChange={(e) => setmessage(e.target.value)}></textarea>
                                <button className='btn_primary'>Send Message</button>
                            </form>
                        )}
                    </div>                    
                    <div className='mobileMap ourMap'>
                        <div className='map_holder'>
                            <iframe title='SCTC Map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217972.70283029746!2d73.97748862499998!3d31.3914304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919018a8ea548c1%3A0x4a52db69c2c814f!2sThe%20University%20of%20Lahore!5e0!3m2!1sen!2s!4v1656856582082!5m2!1sen!2s" width="600" height="450" style={{ border: "0px"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Contact