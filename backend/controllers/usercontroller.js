const User = require("../models/usermodel");
const sendEmail = require("../utils/sendmail");
const sendToken = require("../utils/getjwt");
const crypto = require("crypto");
const Errorhandler = require("../middleware/errorhandler"); //ye hum ny product error k liye bnya mtlb glt id dy user to server bnd naw ho
const catchasyncerror = require("../middleware/asyncerror");
const nodemailer = require("nodemailer");
exports.createuser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    user = await User.create({
      name,
      email,
      password,
    });
    sendToken(res, user, 201, "User Registered Successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//login
exports.loginuser = catchasyncerror(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Errorhandler("Please Enter Email & Password", 400)); //ye khud errorhandler bnya wa ha
  }
  const user = await User.findOne({ email }).select("+password"); //password sedha is liye ni diya wa kio k upar false kiyawa tbhi select method use kiya
  if (!user) {
    return next(new Errorhandler("Invalid Email ", 401));
  }
  const passwordmatch = await user.comparePassword(password); //ye fuction bnya wa bcrpyt ka model mein compare k liye
  if (!passwordmatch) {
    return next(new Errorhandler("Invalid  password", 401));
  }
  sendToken(res,user,200, "Login Successfully");
});
exports.logout = catchasyncerror(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out Successfully",
  });
});
exports.forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!req.body.email) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all the fields" });
    }
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    //Get resettoken save kiya databse mein
    const resettoken = user.Resetpasswordtoken();

    await user.save({ validateBeforeSave: false });

    const resetpasswordurl = `${req.protocol}://${req.get(
      "host"
    )}/reset/${resettoken}`;
    const message = `Your Password reset token is:-\n\n ${resetpasswordurl} \n\n If you have not requested this email then, please ignore it`;
    try {
      await sendEmail({
        email: user.email,
        subject: "SCTC PASSWORD RECOVERY",
        message,
      });
      res.status(200).json({
        success: true,
        message: `OTP sent to ${user.email}`,
      });
    } catch (error) {
      user.resetpasswordtoken = undefined;
      user.resetpasswordexpire = undefined; //ye undefined kiya k phly upar save krwa chuky ha error naw aye tbhi undefined kr k save kr diya wa
      await user.save({ validateBeforeSave: false }); //ye save kr liya hum ny
      res.status(500).json({ success: false, message: error.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error.message);
  }
};
exports.resetPassword = async (req, res) => {
  try {
    if (!req.body.password || !req.body.confirmpassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all the fields" });
    }
    if (req.body.password !== req.body.confirmpassword) {
      return res
        .status(404)
        .json({ success: false, message: "Password Not Matched" });
    }

    const resetpasswordtoken = crypto
      .createHash("sha256")
      .update(process.env.secretresettoken)
      .digest("hex");

    // console.log(resetpasswordtoken);
    const user = await User.findOne({
      resetpasswordtoken: resetpasswordtoken,
      resetpasswordexpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Otp Invalid or has been Expired" });
    }

    user.password = req.body.password;
    user.resetpasswordtoken = undefined;
    user.resetpasswordexpire = undefined;
    await user.save();

    sendToken(res, user, 200, "Password Changed Successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//me
//get user detail
exports.getuserdetails = catchasyncerror(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});
//get all users(Admin)
exports.getallusers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "No User Found" });
  }
};
//get single user(Admin)
exports.getsingleuser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          message: `User Does Not exist this id:${req.params.id}`,
        });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "User Does Not exist this id:${req.params.id}",
      });
  }
};
// user delete --(Admin)
exports.deleteuser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new Errorhandler(`User Does Not exist this id:${req.params.id}`)
      );
    }
    if (user.email === "muhammadhamza7022@gmail.com") {
      return next(new Errorhandler(`ADMIN NOT DELETED`));
    }

    await user.remove();
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: `User Does Not exist this id: ${req.params.id}`,
      });
  }
};
//update password
exports.updatepassword = catchasyncerror(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const passwordmatch = await user.comparePassword(req.body.oldpassword); //ye fuction bnya wa bcrpyt ka model mein compare k liye
  if (!passwordmatch) {
    return next(new Errorhandler("Old password Incorrect", 401));
  }
  if (req.body.newpassword !== req.body.conformpassword) {
    return next(new Errorhandler("Password Not Matched", 404));
  }
  user.password = req.body.newpassword;
  await user.save();
  sendToken(res,user,200,"Password Changed Successfully");
});

//update user profile
exports.updateprofile = async (req, res) => {
  try {
    if(!req.body.name || !req.body.email){
      return res.status(400).json({success:false,message:"Please enter all the fields"})
    }
    const newuserdata = {
      name: req.body.name,
      email: req.body.email,
    };
    const user = await User.findByIdAndUpdate(req.user.id, newuserdata, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      user,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
exports.contact_user = catchasyncerror(async (req, res, next) => {
  const{firstname,lastname,email,subject,message}=req.body
  if(!firstname ||!lastname|| !email||!subject||!message){
    return res.status(400).json({success:false,message:"Please enter all the fields"})
  }
 

  // const message = `Thank You! For use sctc website`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  const mailoption = {
    from: process.env.SMPT_MAIL,
    to: email,
    subject: "CONTACT SCTC WEBSITE",
    text: message,
    html:`
    <div style="padding:10px;border-style: ridge">
    <h2>CONTACT INFORMATION</h2>
    <h4>Name: ${firstname} ${lastname}</h4>
    <h4>Email: ${email}</h4>

    <h3>Subject: ${subject}</h3>
    <ul>
        <li><b>Message</b>: ${message}</li>
    </ul>`
  };
  transporter.sendMail(mailoption, function (error, info) {
    if (error)
        {
          res.json({status: true, respMesg: error.message})
        } 
        else
        {
          res.json({status: true, respMesg: `Message Sent Successfully`})
        }
     
  });
});
//news_letter
exports.news_letter= catchasyncerror(async (req, res, next) => {
  const{name,email}=req.body
  if(!name || !email){
    return res.status(400).json({success:false,message:"Please enter all the fields"})
  }
 


  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  const mailoption = {
    from: process.env.SMPT_MAIL,
    to: email,
    subject: "Thanks for Subscribing us.",
    html:`
    <div style="padding:10px;border-style: ridge">
    <h2>MR_SCTC WEBSITE</h2>
    <h4>Name: ${name} </h4>
    <h3> Thanks for subscribing to our Website. You'll always receive updates from us. And we won't share and sell your information.</h3>
    <ul>
        <li><b>SCTC WEBSITE</b>:${req.protocol}://${req.get(
          "host"
        )}</li>
    </ul>`
  };
  transporter.sendMail(mailoption, function (error, info) {
    if (error)
        {
          res.json({status: true, respMesg: error.message})
        } 
        else
        {
          res.json({status: true, respMesg: `Thanks for Subscribing us.`})
        }
     
  });
});