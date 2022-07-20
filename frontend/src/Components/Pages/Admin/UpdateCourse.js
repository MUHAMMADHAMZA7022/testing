import "./Dashboard.css";
import Sidebar from './Sidebar';
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CLEAR_ERROR,
  updateProduct,
  getProductDetails,
} from "../../../redux/action/courseaction";
import { useAlert } from "react-alert";
import { UPDATE_COURSE_RESET } from "../../../redux/Constant/courseconstant";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";


function UpdateCourse() {
  const dispatch = useDispatch();
  let history = useNavigate();
  const alert = useAlert();
  const productId = useParams().id;
  const { course, error } = useSelector((state) => state.courseDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.course);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [course_file, setcourse_file] = useState("");
  const [cateogery, setcateogery] = useState("");
  const [instructor, setinstructor] = useState("");
  const [instructor_field, setinstructor_field] = useState("");
  const [instructor_bio, setinstructor_bio] = useState("");
  const [duration, setduration] = useState("");
  const [images, setImages] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState("");



  const categories = [
    "Biology",
    "Statical",
    "Biostatics"
  ];
  useEffect(() => {
    if (course && course._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(course.name);
      setPrice(course.price);
      setDescription(course.description);
      setcourse_file(course.course_file);
      setcateogery(course.cateogery);
      setinstructor(course.instructor);
      setinstructor_field(course.instructor_field);
      setinstructor_bio(course.instructor_bio);
      setduration(course.duration);
      setAvatarPreview(course.images.url);
    }
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERROR());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(CLEAR_ERROR());
    }

    if (isUpdated) {
      alert.success("Course Updated Successfully");
      history("/all/course");
      dispatch({ type: UPDATE_COURSE_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    course,
    updateError,
  ]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("cateogery", cateogery);
    myForm.set("duration", duration);
    myForm.set("instructor", instructor);
    myForm.set("instructor_field", instructor_field);
    myForm.set("instructor_bio", instructor_bio);
    myForm.set("course_file", course_file);
    myForm.set("images", images);
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
          <h1>Update Course</h1>
          <form className='courseForm' encType="multipart/form-data" onSubmit={createProductSubmitHandler}>
            <div class="form__group field">
              <input
                className='form__field'
                type="text"
                placeholder="Course Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="crsName"
              />
              <label for="crsName" className="form__label">Course Name</label>
            </div>
            {/* <div class="form__group field">
              <input
                className='form__field'
                type="text"
                placeholder="File Url"
                required
                value={course_file}
                onChange={(e) => setcourse_file(e.target.value)}
              />
              <label for="name" className="form__label">Event Name</label>
            </div> */}
            <div class="form__group field">
              <textarea
                className='form__field'
                placeholder="Course Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
                id="crsdesp"
              ></textarea>
              <label for="crsdesp" className="form__label">Course Description</label>
            </div>
            <div class="form__group field">
              <input
                className='form__field'
                type="number"
                placeholder=" Course Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                id="crsprc"
              />
              <label for="crsprc" className="form__label">Course Price</label>
            </div>
            <img src={avatarPreview} alt="Course Preview" className="imageeee" />

            <div class="form__group field">
              <input
                className='form__field'
                type="file"
                name="images"
                accept="image/*"
                onChange={updateProfileDataChange}
              />
            </div>
            <div class="form__group field">
              <input
                className='form__field'
                type="text"
                placeholder="Instructor Name"
                required
                value={instructor}
                onChange={(e) => setinstructor(e.target.value)}
                id="insName"
              />
              <label for="insName" className="form__label">Instructor Name</label>
            </div>
            <div class="form__group field">
              <input
                className='form__field'
                type="text"
                placeholder="Instructor Field"
                required
                value={instructor_field}
                onChange={(e) => setinstructor_field(e.target.value)}
                id="insField"
              />
              <label for="insField" className="form__label">Instructor Field</label>
            </div>
            <div class="form__group field">
              <textarea
                className='form__field'
                placeholder="Instructor Bio"
                cols="30"
                rows="1"
                value={instructor_bio}
                onChange={(e) => setinstructor_bio(e.target.value)}
                id="insBio"
              ></textarea>
              <label for="insBio" className="form__label">Instructor Bio</label>
            </div>
            <div class="form__group field">
              <input
                className='form__field'
                type="text"
                placeholder="Course Duration"
                required
                value={duration}
                onChange={(e) => setduration(e.target.value)}
                id="crsDue"
              />
              <label for="crsDue" className="form__label">Course Duration</label>
            </div>
            <div class="form__group field">
              <select className="selectOpt form__field" value={cateogery} onChange={(e) => setcateogery(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
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