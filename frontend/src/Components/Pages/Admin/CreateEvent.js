import "./Dashboard.css";
import Sidebar from "./Sidebar";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvents, CLEAR_ERROR_EVENT } from "../../../redux/action/eventaction";
import { NEW_EVENT_RESET } from "../../../redux/Constant/eventconstant";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { LoadingButton } from "@mui/lab";
// import moment from "moment"
function Courses() {
  let history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector((state) => state.newEvent);

  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [location, setlocation] = useState("");
  const [images, setImages] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERROR_EVENT());
    }

    if (success) {
      alert.success("Workshop Created Successfully");
      history("/all/events");
      dispatch({ type: NEW_EVENT_RESET });
    }
  }, [dispatch, success, error, alert, history]);

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
    dispatch(createEvents(value));
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
    console.log(images);
    console.log(avatarPreview);
  };
  return (
    <Fragment>
      <div className="dashboard_holder courses">
        {/* Sidebar */}
        <div className="dSidebar">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="dashboard_content courses_content">
          <h1>Create Workshop</h1>
          <form
            className="courseForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <div class="form__group field">
              <input
                className='form__field'
                type="text"
                placeholder="Workshop Title"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="evnName"
              />
              <label for="evnName" className="form__label">Workshop Title</label>
            </div>
            <div class="form__group field">
              <input
                className='form__field'
                type="number"
                placeholder="Workshop Price"
                required
                value={price}
                onChange={(e) => setprice(e.target.value)}
                id="evnName"
              />
              <label for="evnName" className="form__label">Workshop Price</label>
            </div>
            <div class="form__group field">
              {images ? (
                <img
                  src={avatarPreview}
                  alt="Event Preview"
                  className="imageeee"
                />
              ) : (null)}
              <input
                className='form__field'
                type="file"
                placeholder="Workshop Image"
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
              <label for="evndesp" className="form__label">Workshop Description</label>
            </div>
            <div class="form__group field">
              <input
                className='form__field'
                type="datetime-local"
                placeholder="Event Start Date "
                required
                value={startdate}
                onChange={(e) => setStartdate(e.target.value)}
                id="evnSdate"
              />
              <label for="evnSdate" className="form__label">Start Date</label>
            </div>

            <div class="form__group field">
              {/* <input
                className='form__field'
                type="datetime-local"
                placeholder="Event End Date"
                required
                min={startdate}
                value={enddate}
                onChange={(e) => setEnddate(e.target.value)}
              /> */}




              <input
                type="datetime-local"
                placeholder="Event End Date"
                required
                min={startdate}
                value={enddate}
                className="form__field"
                onChange={(e) => setEnddate(e.target.value)}
                id="evnEdate"
                />
              <label for="evnEdate" className="form__label">End Date</label>
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
              <label for="evnLoc" className="form__label">Workshop Location</label>
            </div>
            {loading === true ? (
              <LoadingButton
                className="btn_primary"
                loading
                loadingPosition="center"
                variant="outlined"
              >
                Create
              </LoadingButton>
            ) : (
              <button className="btn_primary">Create</button>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Courses;

// import "./Dashboard.css";
// import Sidebar from './Sidebar';
// import React, { Fragment, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {  clear_errors, courseregister } from "../../../redux/action/courseaction";
// // import { useAlert } from "react-alert";
// import { Button } from '@mui/material';
// import AccountTreeIcon from "@mui/icons-material/AccountTree";
// import DescriptionIcon from "@mui/icons-material/Description";
// import StorageIcon from "@mui/icons-material/Storage";
// import SpellcheckIcon from "@mui/icons-material/Spellcheck";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// // import { NEW_PRODUCT_RESET } from "../../redux/constant/productConstants";
// // import Loader from "./../Layout/Loader/Loader";

// const Newcourses = ({ history }) => {
//   const dispatch = useDispatch();
//   // const alert = useAlert();

//   const { loading, error, success } = useSelector((state) => state.coursereducer);

//   const [name, setName] = useState("");
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState("");
//   const [file, setfile] = useState("");
//   const [cateogery, setcateogery] = useState("");
//   const [instructor, setinstructor] = useState(0);
//   const [deadline, setdeadline] = useState(0);
//   const [images, setImages] = useState([]);
//   const [imagesPreview, setImagesPreview] = useState([]);

//   const categories = [
//     "Womens",
//     "Newinn",
//     "Accessories",
//     "Unstiched",
//     "AClothes",
//     "Replicas",
//     "ReadyToWear",
//     "VaslFeatured",
//     "Bags",
//     "Scarves",
//     "Perfumes",
//     "Cosmetics"
//   ];

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clear_errors());
//     }

//     if (success) {
//       alert.success("Product Created Successfully");
//       history.push("/admin/dashboard");
//       // dispatch({ type: NEW_PRODUCT_RESET });
//     }
//   }, [dispatch,  error, history, success]);

//   const createProductSubmitHandler = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();
//     myForm.set("name", name);
//     myForm.set("price", price);
//     myForm.set("description", description);
//     myForm.set("cateogery", cateogery);
//     myForm.set("deadline", deadline);
//     myForm.set("instructor", instructor);
//     myForm.set("file", file);

//     images.forEach((image) => {
//       myForm.append("images", image);
//     });
//     // const value = Object.fromEntries(myForm.entries());
//     // value.topics = myForm.getAll("topics");
//     dispatch(courseregister(myForm));
//   };

//   const createProductImagesChange = (e) => {
//     const files = Array.from(e.target.files);

//     setImages([]);
//     setImagesPreview([]);

//     files.forEach((file) => {
//       const reader = new FileReader();

//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setImagesPreview((old) => [...old, reader.result]);
//           setImages((old) => [...old, reader.result]);
//         }
//       };

//       reader.readAsDataURL(file);
//     });
//   };

//   return (
//     <Fragment>
//       {/* <MetaData title="Create Product" /> */}
//       <div className="dashboard">
//         < Sidebar />
//         <div className="newProductContainer">
//           <form
//             className="createProductForm"
//             encType="multipart/form-data"
//             onSubmit={createProductSubmitHandler}
//           >
//             <h1>Create Product</h1>
//             {/* {loading === true ? <Loader /> : null} */}

//             <div>
//               <SpellcheckIcon />
//               <input
//                 type="text"
//                 placeholder="Course Name"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div>
//               <SpellcheckIcon />
//               <input
//                 type="text"
//                 placeholder="File Url"
//                 required
//                 value={file}
//                 onChange={(e) => setfile(e.target.value)}
//               />
//             </div>
//             <div>
//               <SpellcheckIcon />
//               <input
//                 type="text"
//                 placeholder="INstructor Name"
//                 required
//                 value={instructor}
//                 onChange={(e) => setinstructor(e.target.value)}
//               />
//             </div>
//             <div>
//               <AttachMoneyIcon />
//               <input
//                 type="number"
//                 placeholder="Price"
//                 required
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </div>
//             <div>
//               <DescriptionIcon />

//               <textarea
//                 placeholder="Product Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 cols="30"
//                 rows="1"
//               ></textarea>
//             </div>
//             <div>
//               <AccountTreeIcon />
//               <select onChange={(e) => setcateogery(e.target.value)}>
//                 <option value="">Choose Category</option>
//                 {categories.map((cate) => (
//                   <option key={cate} value={cate}>
//                     {cate}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <StorageIcon />
//               <input
//                 type="number"
//                 placeholder="Select Deadline"
//                 required
//                 onChange={(e) => setdeadline(e.target.value)}
//               />
//             </div>
//             <div id="createProductFormFile">
//               <input
//                 type="file"
//                 name="avatar"
//                 accept="image/*"
//                 onChange={createProductImagesChange}
//                 multiple
//               />
//             </div>
//             <div id="createProductFormImage">
//               {imagesPreview.map((image, index) => (
//                 <img key={index} src={image} alt="Product Preview" />
//               ))}
//             </div>

//             <Button
//               id="createProductBtn"
//               type="submit"
//               disabled={loading ? true : false}
//             >
//               Create
//             </Button>
//           </form>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Newcourses;
