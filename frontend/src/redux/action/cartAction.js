import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  CART_RESET,
  CHECK_OUT, 
  ADD_TO_CART_WORK,
} from "../Constant/cartConstants";
import axios from "axios";

// Add to Cart
export const addItemsToCart = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/course/singlecourse/${id}`);
  console.log(data);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      course: data.scourse._id,
      name: data.scourse.name,
      price: data.scourse.price,
      image: data.scourse.images.url,
   
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
// Add to Cart
export const addItemsToCartWork = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/event/singleevent/${id}`);
  console.log(data.sevent._id);
  dispatch({
    type: ADD_TO_CART_WORK,
    payload: {
      event: data.sevent._id,
      name: data.sevent.name,
      price: data.sevent.price,
      image: data.sevent.images.url,
   
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
   
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// RESET FROM CART
export const RESETCart = () => async (dispatch, getState) => {
  dispatch({
    type: CART_RESET,
  });
  localStorage.removeItem(
    "cartItems",
    JSON.stringify(getState().cart.cartItems)
  );
  localStorage.clear();

};
// SAVE SHIPPING INFO
export const savecheckout = (data) => async (dispatch) => {
  dispatch({
    type: CHECK_OUT,
    payload: data,
  });

  localStorage.setItem("checkout", JSON.stringify(data));
};


