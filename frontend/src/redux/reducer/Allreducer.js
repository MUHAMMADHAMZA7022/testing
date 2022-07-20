import { combineReducers } from "redux";
import {
  ALLcoursesReducer,
  courseDetailsReducer,
  newCourseReducer,
  updatedeletecourseReducer ,
} from "./coursereducer";
import {
  ALLeventsReducer,
  eventDetailsReducer,
  newEventReducer,
  updatedeleteeventReducer ,
} from "./eventreducer";
import {
  ALLservicesReducer,
  serviceDetailsReducer,
  newServiceReducer,
  updatedeleteserviceReducer, 
  JoinServiceReducer,
} from "./servicereducer";
import {
    allUsersReducer,
    userReducer,
    profileReducer,
    forgotPasswordReducer,
    userDetailsReducer,
    contactReducer,
    newsletterReducer
  } from "./userreducer";
  import {
    newOrderReducer,
    myOrdersReducer,
    orderReducer,
    orderDetailsReducer,
    allOrdersReducer,
    // randomDetailsReducer,
    randomemailReducer,
    emailReducer,
  } from "./orderReducer";
  import { cartReducer } from "./cartReducer";
const AllReducer = combineReducers({
  //users
    userDetails: userDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer, 
    allUsers: allUsersReducer,
    contactuser:contactReducer,
    newsletter:newsletterReducer,
    //courses
    newCourse: newCourseReducer,
    courses: ALLcoursesReducer,
    course:updatedeletecourseReducer ,
    courseDetails: courseDetailsReducer,
    //events
    newEvent: newEventReducer,
    events: ALLeventsReducer,
    event:updatedeleteeventReducer ,
    eventDetails: eventDetailsReducer,
   //service
   newService: newServiceReducer,
   services: ALLservicesReducer,
   service:updatedeleteserviceReducer ,
   serviceDetails: serviceDetailsReducer,
   joinservice:JoinServiceReducer,
   //orders
   newOrder: newOrderReducer,
   myOrders: myOrdersReducer,
   orderDetails: orderDetailsReducer,
   emailorder:emailReducer,
   // unknownorder: randomDetailsReducer,
   randomemail: randomemailReducer,
   allOrders: allOrdersReducer,
   order: orderReducer,
   //cart
   cart: cartReducer,
  });
  
  export default AllReducer;