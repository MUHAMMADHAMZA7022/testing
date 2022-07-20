import {
    NEW_SERVICE_REQUEST ,
    NEW_SERVICE_SUCCESS,
    NEW_SERVICE_FAIL,
      ADMIN_SERVICE_REQUEST,
    ADMIN_SERVICE_SUCCESS,
    ADMIN_SERVICE_FAIL,
    ALL_SERVICE_FAIL,
    ALL_SERVICE_REQUEST,
    ALL_SERVICE_SUCCESS,
  
    SERVICE_DETAILS_REQUEST,
    SERVICE_DETAILS_FAIL,
    SERVICE_DETAILS_SUCCESS,
   
    UPDATE_SERVICE_REQUEST,
    UPDATE_SERVICE_SUCCESS,
    UPDATE_SERVICE_FAIL,
    DELETE_SERVICE_REQUEST,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAIL,
  JOIN_SERVICE_REQUEST,
  JOIN_SERVICE_SUCCESS,
  JOIN_SERVICE_FAIL,
    CLEAR_ERRORS,
  } from "../Constant/serviceconstant";
  import axios from "axios";



  
//Get All SERVICE
export const getService =
() =>
async (dispatch) => {
  try {
    dispatch({ type:   ALL_SERVICE_REQUEST, });

    let link = `/api/v1/service/allservice`;

    const { data } = await axios.get(link);

    dispatch({
      type:  ALL_SERVICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type:   ALL_SERVICE_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Get All COURSES For Admin
export const getAdminProduct = () => async (dispatch) => {
try {
  dispatch({ type: ADMIN_SERVICE_REQUEST });

  const { data } = await axios.get("/api/v1/service/admin/service");

  dispatch({
    type:   ADMIN_SERVICE_SUCCESS,
    payload: data,
  });
} catch (error) {
  dispatch({
    type:  ADMIN_SERVICE_FAIL,
    payload: error.response.data.message,
  });
}
};
// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
try {
  dispatch({ type: SERVICE_DETAILS_REQUEST });
  const { data } = await axios.get(`/api/v1/service/singleservice/${id}`);
  dispatch({
    type: SERVICE_DETAILS_SUCCESS,
    payload: data.service,
  });
} catch (error) {
  dispatch({
    type: SERVICE_DETAILS_FAIL,
    payload: error.response.data.message,
  });
}
};

// Create Product
export const createService = (serviceData) => async (dispatch) => {
try {
  // console.log(serviceData)
  dispatch({ type: NEW_SERVICE_REQUEST });

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data } = await axios.post(
    `/api/v1/service/admin/createservice`,
    serviceData,
    config
  );

  dispatch({
    type: NEW_SERVICE_SUCCESS,
    payload: data,
  });
} catch (error) {
  dispatch({
    type: NEW_SERVICE_FAIL,
    payload: error.response.data.message,
  });
}
};

// // Update Product
export const updateProduct = (id, serviceData) => async (dispatch) => {
try {
  dispatch({ type: UPDATE_SERVICE_REQUEST });

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data } = await axios.put(
    `/api/v1/service/admin/service/${id}`,
    serviceData,
    config
  );

  dispatch({
    type: UPDATE_SERVICE_SUCCESS,
    payload: data.success,
  });
} catch (error) {
  dispatch({
    type: UPDATE_SERVICE_FAIL,
    payload: error.response.data.message,
  });
}
};

// // Delete Product
export const deleteProduct = (id) => async (dispatch) => {
try {
  dispatch({ type: DELETE_SERVICE_REQUEST });

  const { data } = await axios.delete(`/api/v1/service/admin/deleteservice/${id}`);

  dispatch({
    type: DELETE_SERVICE_SUCCESS,
    payload: data.success,
  });
} catch (error) {
  dispatch({
    type: DELETE_SERVICE_FAIL,
    payload: error.response.data.message,
  });
}
};
//service_email

export const service_email = (id,usercontact) => async (dispatch) => {
  try {
    dispatch({ type: JOIN_SERVICE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/v1/service/join/service/${id}`, usercontact, config);

    dispatch({ type: JOIN_SERVICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: JOIN_SERVICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clear error
export const CLEAR_ERROR_SERVICE = () => async (dispatch) => {
dispatch({ type: CLEAR_ERRORS });
};
