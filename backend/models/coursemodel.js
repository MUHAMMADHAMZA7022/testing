const mongoose = require("mongoose");
const courseSechema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please Enter Course Name"],
    },
    description: {
        type: String,
        required: [true, "Please Enter Course Description"],
    },
    course_file: {
        type: String,
        required: [true, "Please Enter Course File"],
    },

    price: {
        type: Number,
        required: [true, "Please Enter Course Price"],
        maxlength: [8, "Price caannot exceed 8 charaters"],
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
        instructor: {
        type: String,
        trim: true,
        required: [true, "Please Enter Course Instructor Name"],
    },
    instructor_field: {
        type: String,
        trim: true,
        required: [true, "Please Enter Course Instructor Field"],
    },
     instructor_bio: {
        type: String,
        trim: true,
        required: [true, "Please Enter Course Instructor Bio"],
    },
    duration:{
        // type: Number*24*60*60*1000 + Date.now ,
        type:String,
        required: [true, "Please Enter Course Duration"],

    },
    cateogery: {
        type: String,
        required: [true, "Please Enter Course Cateogry"],
    },

  
    createdate: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Course", courseSechema)