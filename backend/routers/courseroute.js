const express = require("express");
const router = express.Router();
const auth =require( "../utils/auth");

const {
  createcourse, allcourses, allcoursesadmin, updatecourse, singlecourse, deletecourse,
} = require("../controllers/coursecontroller"); 
router.route("/admin/createcourse").post( auth,createcourse);
router.route("/admin/courses").get(auth, authorizerole("admin"), allcoursesadmin);
router.route("/admin/course/:id").put(auth, authorizerole("admin"), updatecourse);
router.route("/admin/deletecourse/:id").delete(auth, authorizerole("admin"), deletecourse);

router.route("/allcourses").get(allcourses);
router.route("/singlecourse/:id").get(singlecourse);

  module.exports = router;

