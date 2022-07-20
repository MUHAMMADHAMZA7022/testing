const mongoose = require("mongoose");
const serviceSechema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please Enter Service Name"],
    },
    description: {
        type: String,
        required: [true, "Please Enter Service Description"],
    },
    images: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },

    createdate: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Service", serviceSechema)