const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  checkout: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    university: {
        type: String,
        required: true,
      },
    department:{
        type: String,
        required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      course: {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
        // required: true,
      },
      event: {
        type: mongoose.Schema.ObjectId,
        ref: "Event",
        // required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.String,
    ref: "user",
    // name:user
    // required: true,
  },

  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Not Verified",
  },
  verifiedAt:{
    type:Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", orderSchema);
