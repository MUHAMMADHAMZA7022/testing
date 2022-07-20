import {
    NEW_SERVICE_REQUEST ,
    NEW_SERVICE_SUCCESS,
    NEW_SERVICE_FAIL,
    NEW_SERVICE_RESET,
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
    UPDATE_SERVICE_RESET,
    DELETE_SERVICE_REQUEST,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAIL,
    DELETE_SERVICE_RESET,
  
    JOIN_SERVICE_REQUEST,
    JOIN_SERVICE_SUCCESS,
    JOIN_SERVICE_FAIL,
    JOIN_SERVICE_RESET,
    CLEAR_ERRORS,
  } from "../Constant/serviceconstant";
  
  export const ALLservicesReducer = (state = { services: [] }, action) => {
    switch (action.type) {
      case ALL_SERVICE_REQUEST:
      case ADMIN_SERVICE_REQUEST:
        return {
          loading: true,
          services: [],
        };
      case ALL_SERVICE_SUCCESS:
        return {
          loading: false,
          latestservice: action.payload.latestservice,
          oldservice: action.payload.oldservice,
          serviceCount: action.payload.servicecount,

        };
      case ADMIN_SERVICE_SUCCESS:
        return {
          loading: false,
          latestservice: action.payload.latestservice,
        };
      case ALL_SERVICE_FAIL:
      case ADMIN_SERVICE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const serviceDetailsReducer = (state = { service: {} }, action) => {
    switch (action.type) {
      case SERVICE_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case SERVICE_DETAILS_SUCCESS:
        return {
          loading: false,
          service: action.payload,
        };
      case SERVICE_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const newServiceReducer = (state = { service: {} }, action) => {
    switch (action.type) {
      case  NEW_SERVICE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_SERVICE_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          service: action.payload.service,
        };
      case NEW_SERVICE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_SERVICE_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const updatedeleteserviceReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_SERVICE_REQUEST:
      case UPDATE_SERVICE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_SERVICE_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_SERVICE_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_SERVICE_FAIL:
      case UPDATE_SERVICE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_SERVICE_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_SERVICE_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  //contact|_email order
export const JoinServiceReducer = (state = {}, action) => {
  switch (action.type) {
    case JOIN_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case JOIN_SERVICE_SUCCESS:
      return {
        loading: false,
        isservice: action.payload,
      };

    case JOIN_SERVICE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      case JOIN_SERVICE_RESET:
        return {
         ...state,
          isservice: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };

    default:
      return state;
  }
};
  