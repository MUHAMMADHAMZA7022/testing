const express = require("express");
const router = express.Router();
const auth =require( "../utils/auth");

const {
    createevent, allevent, deleteevent, updateevent, alleventsadmin, singleevent, joinevent, joindeleteevent
} = require("../controllers/eventcontroller"); 
router.route("/admin/createevent").post( auth,createevent);
router.route("/admin/events").get(auth, authorizerole("admin"), alleventsadmin);
router.route("/admin/event/:id").put(auth, authorizerole("admin"), updateevent);
router.route("/admin/deleteevent/:id").delete(auth, authorizerole("admin"), deleteevent);

router.route("/allevents").get(allevent);
router.route("/singleevent/:id").get(singleevent);

  module.exports = router;
