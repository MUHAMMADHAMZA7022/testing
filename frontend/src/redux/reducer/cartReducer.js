import {
  ADD_TO_CART,
  ADD_TO_CART_WORK,
  REMOVE_CART_ITEM,
  CART_RESET,
  CHECK_OUT ,
} from "../Constant/cartConstants";

export const cartReducer = (
  state = { cartItems: [], checkout: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.course === item.course
      );
   
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.course === isItemExist.course ? item : i
          )
        };
      }
      
       else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
      case ADD_TO_CART_WORK:
        const itemw = action.payload;
   
        const isItemExistWork = state.cartItems.find(
          (i) => i.event === itemw.event
        );
        if (isItemExistWork) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.event === isItemExistWork.event ? itemw : i 
            )
          };
        }
        
         else {
          return {
            ...state,
            cartItems: [...state.cartItems, itemw],
          };
        }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: (state.cartItems.filter((i) => 
        (i.event||i.course)&&(i.course||i.event) !== action.payload))
  
      };
    case CART_RESET:
      return {
        ...state,
        success: false,
      };

    case CHECK_OUT :
      return {
        ...state,
        checkout: action.payload,
      };
      default:
        return state;
  }}