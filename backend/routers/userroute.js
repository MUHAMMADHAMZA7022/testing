const express = require("express");
const router = express.Router();
const auth =require( "../utils/auth");

const {
  createuser, loginuser, logout, forgetPassword, resetPassword,getuserdetails,getallusers,getsingleuser,deleteuser,updatepassword,updateprofile, contact_user, news_letter
} = require("../controllers/usercontroller"); 
router.route("/register").post( createuser);
 router.route("/login").post( loginuser);
 router.route("/forgotpassword").post( forgetPassword);
 router.route("/resetpassword/:token").put( resetPassword);
 router.route("/logout").get(logout);
 router.route("/contact").post(contact_user);
 router.route("/news/letter").post(news_letter);
  router.route("/me").get(auth, getuserdetails);
 router.route("/admin/allusers").get(auth, authorizerole("admin"), getallusers);
router.route("/admin/singleuser/:id").get(auth, authorizerole("admin"), getsingleuser);
// router
//   .route("/admin/updaterole/:id")
//   .put(auth, authorizerole("admin"), updaterole);
router.route("/admin/deleteuser/:id").delete(auth, authorizerole("admin"), deleteuser);
router.route("/password/update").put(auth, updatepassword);
 router.route("/profile/update").put(auth, updateprofile);
  module.exports = router;

