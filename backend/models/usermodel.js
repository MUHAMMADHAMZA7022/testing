const mongoose = require("mongoose");
const validator = require("validator");
const crypto=require("crypto");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetpasswordtoken: String,
  resetpasswordexpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } //ye hum ny kaha agr modified nai hwa to next py jaye

  this.password = await bcrypt.hash(this.password, 10);
});

//jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token

userSchema.methods.Resetpasswordtoken = function () {
  // Generating Token


  // Hashing and adding resetPasswordToken to userSchema
  this.resetpasswordtoken = crypto
    .createHash("sha256")
    .update(process.env.secretresettoken)
    .digest("hex");
  this.resetpasswordexpire = Date.now() + 15 * 60 * 1000;

  return this.resetpasswordtoken;
};
module.exports = mongoose.model("user", userSchema);
