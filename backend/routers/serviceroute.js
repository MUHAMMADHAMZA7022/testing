const express = require("express");
const router = express.Router();
const auth =require( "../utils/auth");

const {
    createservice, allservice, deleteservice, updateservice, allservicesadmin, singleservice, joinserviceemail
} = require("../controllers/servicecontroller"); 
router.route("/admin/createservice").post( auth,createservice);
 router.route("/admin/service").get(auth, authorizerole("admin"), allservicesadmin);
 router.route("/admin/service/:id").put(auth, authorizerole("admin"), updateservice);
 router.route("/admin/deleteservice/:id").delete(auth, authorizerole("admin"), deleteservice);
 router.route("/allservice").get(allservice);
 router.route("/join/service/:id").post(joinserviceemail);
 router.route("/singleservice/:id").get(singleservice);

  module.exports = router;
