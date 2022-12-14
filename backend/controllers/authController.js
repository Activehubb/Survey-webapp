const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/user");
const sendTokenToCookie = require("../utils/cookie");
const ErrorHandler = require("../utils/errorHandler");


// Register/Create User => /api/v1/register
exports.createUser = catchAsyncError(async (req, res, next) => {

  const { email, lname, fname, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exist", 400));
  }

  const newUser = await User.create({
    fname,
    lname,
    email,
    password,
  });

  sendTokenToCookie(newUser, 200, res);
});

// Login User => /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  // Compare email and password

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  sendTokenToCookie(user, 200, res);
});

// Get currently Login User => /api/v1/me

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, user });
});

// Update user profile => /api/v1/me/update
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(
      new ErrorHandler(`User with the id: ${req.params.id} not found`)
    );
  }

  res.status(200).json({ success: true, user });
});

// Logout user => /api/v1/logout

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

  res
    .status(200)
    .json({ success: true, message: "You are logged out successfully..." });
});

// Admin route => /api/v1/admin/users

exports.allUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get user details => /api/v1/admin/user/:id TODO

exports.getUserDetail = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User with the ${req.params.id} not found`));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User => /api/v1/admin/user/:id TODO

exports.updateUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(
      new ErrorHandler(`User with the id: ${req.params.id} not found`)
    );
  }

  res.status(200).json({ success: true, user });
});

// Delete User => /api/v1/admin/user/:id TODO

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User with the id: ${req.params.id} not found`)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
  });
});
