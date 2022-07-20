import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import AllReducer from "./reducer/Allreducer";
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    checkout: localStorage.getItem("checkout")
      ? JSON.parse(localStorage.getItem("checkout"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  AllReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
