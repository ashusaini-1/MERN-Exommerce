const User = require("../models/userModel");
// const asyncError = require("express-async-handler");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler=require('../utils/errorhander');
const sendEmail=require('../utils/sendEmail');

const registerUser = catchAsyncErrors(async (req, res,next) => {
  
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
   
        message: "Please fill in all the required details"
     
    });
  }
  const userExist = await User.findOne({email});
  if (userExist) {
    res.status(409).json({
        message: "User already exists"
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "myCloud.public_id",
      url:"myCloud.secure_url",
    },
  });

  sendToken(user, 200, res);
});

const loginUser = catchAsyncErrors(async (req, res,next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});


const logout = catchAsyncErrors(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

const forgotPassword= catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});


const resetPassword = catchAsyncErrors(async (req, res) => {});

const getUserDetails = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

const updatePassword = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    res.send({ error: "User not found" });
  }

  const isPasswordMatched = await user.coparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    res.send({ error: "Old password is incorrect" });
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    res.send({ error: "password does not match" });
  }

  user.password = req.body.newPassword;
  await user.save();
  res.status(200).json({
    message: "updated Successfull",
    user,
  });
});

const updateProfile = catchAsyncErrors(async (req, res) => {});

const getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.send({ message: "User does not exist with Id: ${req.params.id}" });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

const updateUserRole = catchAsyncErrors(async (req, res) => {});

const deleteUser = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.send({ message: "User does not exist with Id: ${req.params.id}" });
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  logout,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
};
