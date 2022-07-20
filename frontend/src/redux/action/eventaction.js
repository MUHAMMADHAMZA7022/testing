import axios from "axios";

import {
    NEW_EVENT_REQUEST ,
    NEW_EVENT_SUCCESS,
    NEW_EVENT_FAIL,
      ADMIN_EVENT_REQUEST,
    ADMIN_EVENT_SUCCESS,
    ADMIN_EVENT_FAIL,
    ALL_EVENT_FAIL,
    ALL_EVENT_REQUEST,
    ALL_EVENT_SUCCESS,
  
    EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_FAIL,
    EVENT_DETAILS_SUCCESS,
   
    UPDATE_EVENT_REQUEST,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAIL,
    DELETE_EVENT_REQUEST,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAIL,
  
    CLEAR_ERRORS,
  } from "../Constant/eventconstant";

//Get All COURSE
export const getEvent =
  () =>
  async (dispatch) => {
    try {
      dispatch({ type:   ALL_EVENT_REQUEST, });

      let link = `/api/v1/event/allevents`;
  
      const { data } = await axios.get(link);

      dispatch({
        type:  ALL_EVENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type:   ALL_EVENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_EVENT_REQUEST });

    const { data } = await axios.get("/api/v1/event/admin/events");

    dispatch({
      type:   ADMIN_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type:  ADMIN_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/event/singleevent/${id}`);
    dispatch({
      type: EVENT_DETAILS_SUCCESS,
      payload: data.sevent,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product
export const createEvents = (courseData) => async (dispatch) => {
  try {
    console.log(courseData)
    dispatch({ type: NEW_EVENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/event/admin/createevent`,
      courseData,
      config
    );

    dispatch({
      type: NEW_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// // Update Product
export const updateProduct = (id, courseData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EVENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/event/admin/event/${id}`,
      courseData,
      config
    );

    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// // Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EVENT_REQUEST });

    const { data } = await axios.delete(`/api/v1/event/admin/deleteevent/${id}`);

    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};


//clear error
export const CLEAR_ERROR_EVENT = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
