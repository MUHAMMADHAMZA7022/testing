const Course = require("../models/coursemodel");
const sendEmail = require("../utils/sendmail");
const sendToken = require("../utils/getjwt");
const Errorhandler = require("../middleware/errorhandler");
const catchasyncerror = require("../middleware/asyncerror");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/apifeatures");
//createcourse -- Admin
exports.createcourse = async (req, res, next) => {
try {
  const { name,  course_file, description, price, instructor,instructor_field,instructor_bio,duration,cateogery } =
  req.body;
  const images = req.body.images;
  const mycloud = await cloudinary.v2.uploader.upload(images,{
    folder: "courses",
   gravity: "faces", crop: "fill",
    quality: "auto", fetch_format: "auto"
  });

  req.body.user = req.user.id;
  const courses = await Course.create({
    name,
    description,
    course_file,
    price,
    instructor,
    instructor_field,
    instructor_bio,
    duration,
    cateogery,
    images: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    courses,
    message: "Course Created Successfully",
  });
} catch (error) {
  res.status(500).json({ success: false, message: error.message });

}
}

//Getcourses All
exports.allcourses = catchasyncerror(async (req, res) => {
  const resultperpage = 8;
  const coursescount = await Course.countDocuments();
  const apiFeature = new ApiFeatures(Course.find().sort( { _id : -1 }), req.query)
    .search()
    .filter();
  allcourses = await apiFeature.query;

  res.status(200).json({
    success: true,
    allcourses,
    coursescount,
    resultperpage
  });
});
//get all admin courses
exports.allcoursesadmin = catchasyncerror(async (req, res) => {
  const latestcourse = await Course.find().sort( { _id : -1 });
  res.status(200).json({
    success: true,
    latestcourse,
  });
});
//one course
exports.singlecourse = catchasyncerror(async (req, res, next) => {
  const scourse = await Course.findById(req.params.id);
  if (!scourse) {
    return next(new Errorhandler("course Not Found", 404));
  }
  res.status(200).json({
    success: true,
    scourse,
  });
});


// updateCourse -- Admin
exports.updatecourse = catchasyncerror(async (req, res,next) => {
  let ucourse = await Course.findById(req.params.id);
  if (!ucourse) {
    return next(new Errorhandler("Course Not Found", 404)); //ly class bnae v utils mein phir ye error bnya wa sb sy phir middleare ein erro.js bnae
  }
  // //addd avtar cloudinary
  if (req.body.images !== "") {

    const imageId = ucourse.images.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
      folder: "courses",
      gravity: "faces", crop: "fill",
      quality: "auto", fetch_format: "auto"
    });

    req.body.images = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  ucourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    ucourse,
    message: "Course Update Successfully",
  });
});

// Delete Course---Admin
exports.deletecourse = catchasyncerror(async (req, res, next) => {
  const dcourse = await Course.findById(req.params.id);
  if (!dcourse) {
    return next(new Errorhandler("Course Not Found", 404));
  }
  // Deleting Images From Cloudinary
  const imageId = dcourse.images.public_id;

  await cloudinary.v2.uploader.destroy(imageId);
  

  await dcourse.remove();
  res.status(200).json({
    success: true,
    message: "Course Deleted Successfully",
  });
});
