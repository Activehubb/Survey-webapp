// Check if user is authenticated or not

const jwt = require("jsonwebtoken");
const user = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler(
        "Unauthorized access, kindly login to use this resources",
        401
      )
    );
  }

  const decoded = jwt.verify(token, process.env.TOKEN);

  req.user = await user.findById(decoded.id);

  next();
});

