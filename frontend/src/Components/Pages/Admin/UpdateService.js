import "./Dashboard.css";
import Sidebar from './Sidebar';
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CLEAR_ERROR_SERVICE,
  updateProduct,
  getProductDetails,
} from "../../../redux/action/serviceaction";
import { useAlert } from "react-alert";
import { UPDATE_SERVICE_RESET } from "../../../redux/Constant/serviceconstant";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";


function UpdateService() {
  const dispatch = useDispatch();
  let history = useNavigate();
  const alert = useAlert();
  const productId = useParams().id;
  const { service, error } = useSelector((state) => state.serviceDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.service);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState("");
  useEffect(() => {
    if (service && service._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(service.name);
      setDescription(service.description);
      setAvatarPreview(service.images.url);
    }
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERROR_SERVICE());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(CLEAR_ERROR_SERVICE());
    }

    if (isUpdated) {
      alert.success("Service Updated Successfully");
      history("/all/services");
      dispatch({ type: UPDATE_SERVICE_RESET });
    }
  }, [
    dispatch,

    alert,
    error,
    history,
    isUpdated,
    productId,
    service,
    updateError,
  ]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);

    myForm.set("description", description);

    myForm.set("images", images);
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
          <h1>Update Service</h1>
          <form className='courseForm' encType="multipart/form-data" onSubmit={createProductSubmitHandler}>
            <div class="form__group field">
              <input
                className='form__field'
                type="text"
                placeholder="Service Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="srvName"
              />
              <label for="srvName" className="form__label">Service Name</label>
            </div>
            <div class="form__group field">
              {
                images ? (

                  <img src={avatarPreview} alt="Service Preview" className="imageeee" />

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
                placeholder="Service Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
                id="srvdesp"
              ></textarea>
              <label for="srvdesp" className="form__label">Service Description</label>
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

export default UpdateService