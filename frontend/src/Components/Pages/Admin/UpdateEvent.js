import "./Dashboard.css";
import Sidebar from './Sidebar';
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CLEAR_ERROR_EVENT,
  updateProduct,
  getProductDetails,
} from "../../../redux/action/eventaction";
import { useAlert } from "react-alert";
import { UPDATE_EVENT_RESET } from "../../../redux/Constant/eventconstant";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";


function UpdateCourse() {
  const dispatch = useDispatch();
  let history = useNavigate();
  const alert = useAlert();
  const productId = useParams().id;
  const { event, error } = useSelector((state) => state.eventDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.event);

  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [location, setlocation] = useState("");
  const [images, setImages] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState("");
  var st = String(event.startdate)

  console.log(st)
  // console.log(new Date(String(event.startdate)).toISOString().substr(0,16))

  useEffect(() => {
    if (event && event._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(event.name);
      setprice(event.price);
      setDescription(event.description);
      setStartdate(new Date(String(event.startdate)).toISOString().substr(0, 16));
      setEnddate(new Date(String(event.enddate)).toISOString().substr(0, 16));
      // console.log(event.enddate)
      setlocation(event.location);
      setOrganization(event.organization);
      setAvatarPreview(event.images.url);
    }
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERROR_EVENT());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(CLEAR_ERROR_EVENT());
    }

    if (isUpdated) {
      alert.success("Event Updated Successfully");
      history("/all/events");
      dispatch({ type: UPDATE_EVENT_RESET });
    }
  }, [
    dispatch,

    alert,
    error,
    history,
    isUpdated,
    productId,
    event,
    updateError,
  ]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("startdate", startdate);
    myForm.set("enddate", enddate);
    myForm.set("description", description);
    myForm.set("organization", organization);
    myForm.set("images", images);
    myForm.set("location", location);
    // const value = Object.fromEntries(myForm.entries());
    // value.topics = myForm.getAll("topics");
    const value = Object.fromEntries(myForm.entries());
    dispatch(updateProduct(productId, value));

  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setImages(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    setImages(reader.result);


  };
  return (
    <Fragment>
      <div className='dashboard_holder courses'>
        {/* Sidebar */}
        <div className='dSidebar'>
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className='dashboard_content courses_content'>
          <h1>Update Event</h1>
          <form className='courseForm' encType="multipart/form-data" onSubmit={createProductSubmitHandler}>
            <div class="form__group field">
              <input
                className='form__field'
                type="text"
                placeholder="Event Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="evnName"
              />
              <label for="evnName" className="form__label">Event Name</label>
            </div>
            <div class="form__group field">
              <input
                className='form__field'
                type="number"
                placeholder="Event Price"
                required
                value={price}
                onChange={(e) => setprice(e.target.value)}
                id="evnName"
              />
              <label for="evnName" className="form__label">Event Price</label>
            </div>
            <div class="form__group field">
              {
                images ? (

                  <img src={avatarPreview} alt="Event Preview" className="imageeee" />

                ) : null
              }
              <input
                className='form__field'
                type="file"
                required
                name="images"
                accept="image/*"
                onChange={updateProfileDataChange}
              />
            </div>
            <div class="form__group field">
              <textarea
                className='form__field'
                placeholder="Event Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
                id="evndesp"
              ></textarea>
              <label for="evndesp" className="form__label">Event Description</label>
            </div>
            <div class="form__group field">
              <input
                className='form__field'
                type="datetime-local"
                placeholder="Event Start Date "
                required
                value={startdate}
                onChange={(e) => setStartdate(e.target.value)}
                id="evSdate"
              />
              <label for="evSdate" className="form__label">Event Start Date</label>
            </div>
            <div class="form__group field">
              <input
                className='form__field'
                type="datetime-local"
                placeholder="Event End Date"
                required
                min={startdate}
                value={enddate}
                onChange={(e) => setEnddate(e.target.value)}
                id="evEdate"
              />
              <label for="evEdate" className="form__label">Event End Date</label>
            </div>
            <div class="form__group field">
              <input
                className='form__field'
                type="text"
                placeholder="Organization Name"
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                id="orgName"
              />
              <label for="orgName" className="form__label">Organization Name</label>
            </div>
            <div class="form__group field">
              <input
                className='form__field'
                type="text"
                placeholder="Event Location"
                required
                value={location}
                onChange={(e) => setlocation(e.target.value)}
                id="evnLoc"
              />
              <label for="evnLoc" className="form__label">Event Location</label>
            </div>
            {
              loading === true ? (<LoadingButton
                className='btn_primary'
                loading
                loadingPosition="center"
                variant="outlined"
              >
                Update
              </LoadingButton>) : (
                <button className='btn_primary'>Update</button>

              )
            }

          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateCourse