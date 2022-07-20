const express = require("express");
const router = express.Router();
const {
  neworder,
  getsingleorder,
  getmyorder,
  getallorder,
  updateorder,
  deleteorder,
  getrandomcheckorder,
  getrandomemailorder,
  orderemail,
} = require("../controllers/ordercontroller");

const authenticate = require("../utils/auth");

router.route("/order/new").post(neworder);
router.route("/order/:id").get(authenticate, getsingleorder);
router.route("/orders/me").get(authenticate, getmyorder);
router.route("/check/order/:id").get(getrandomcheckorder);
router.route("/check/order/email/:user").get(getrandomemailorder);
router
  .route("/admin/orders")
  .get(authenticate, authorizerole("admin"), getallorder);
router
  .route("/admin/order/:id")
  .put(authenticate, authorizerole("admin"), updateorder)
  .delete(authenticate, authorizerole("admin"), deleteorder);
router.route("/admin/emailorder").post(authenticate, authorizerole("admin"), orderemail);

module.exports = router;
