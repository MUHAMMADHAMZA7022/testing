import axios from "axios";

import {
  
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  NEW_COURSE_REQUEST ,
  NEW_COURSE_SUCCESS,
  NEW_COURSE_FAIL,
    ADMIN_COURSE_REQUEST,
  ADMIN_COURSE_SUCCESS,
  ADMIN_COURSE_FAIL,
  ALL_COURSE_FAIL,
  ALL_COURSE_REQUEST,
  ALL_COURSE_SUCCESS,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
   CLEAR_ERRORS,
} from "../Constant/courseconstant";

//Get All COURSE
export const getProduct =
  (keyword = "",  cateogery,) =>
  async (dispatch) => {
    try {
      dispatch({ type:   ALL_COURSE_REQUEST, });
 let link = `/api/v1/course/allcourses?keyword=${keyword}`;
      

     if (cateogery) {
        link = `/api/v1/course/allcourses?keyword=${keyword}&cateogery=${cateogery}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type:  ALL_COURSE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type:   ALL_COURSE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_COURSE_REQUEST });

    const { data } = await axios.get("/api/v1/course/admin/courses");

    dispatch({
      type:   ADMIN_COURSE_SUCCESS,
      payload: data.latestcourse,
    });
  } catch (error) {
    dispatch({
      type:  ADMIN_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/course/singlecourse/${id}`);
    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data.scourse,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product
export const createCourse = (courseData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_COURSE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/course/admin/createcourse`,
      courseData,
      config
    );

    dispatch({
      type: NEW_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// // Update Product
export const updateProduct = (id, courseData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_COURSE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/course/admin/course/${id}`,
      courseData,
      config
    );

    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// // Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COURSE_REQUEST });

    const { data } = await axios.delete(`/api/v1/course/admin/deletecourse/${id}`);

    dispatch({
      type: DELETE_COURSE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};


//clear error
export const CLEAR_ERROR = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
