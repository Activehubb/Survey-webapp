const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");
const Survey = require("../models/survey");

// Create Organization survey => /api/v1/create/survey
exports.createSurvey = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const newSurvey = await Survey.create(req.body);

  res.status(201).json({ success: true, newSurvey });
});

// Get All survey => /api/v1/survey?keyword=test
exports.getAllSurvey = catchAsyncError(async (req, res, next) => {
  const resPerPage = 4;
  const surveyCounts = await Survey.countDocuments();
  const apiFeatures = new APIFeatures(
    Survey.find().populate("user", ["fname", "lname"]),
    req.query
  )
    .search()
    .filter()
    .pagination(resPerPage);

  const getAllSurvey = await apiFeatures.query;

  if (!getAllSurvey) {
    return next(new ErrorHandler("You have not create survey yet", 400));
  }

  res.status(200).json({
    success: true,
    count: getAllSurvey.length,
    getAllSurvey,
    surveyCounts,
  });
});

// Update Organization survey => /api/v1/update/survey/:id
exports.updateSurvey = catchAsyncError(async (req, res, next) => {
  const updateSurvey = await Survey.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  res.status(201).json({ success: true, updateSurvey });
});

// Get Organization survey by ID
exports.getSurveyById = catchAsyncError(async (req, res, next) => {
  const getSurveyById = await Survey.findById(req.params.id).populate("user", [
    "fname",
    "lname",
  ]);

  res.status(200).json({ success: true, getSurveyById });
});

// Delete Organization survey by ID => /api/v1/delete/survey/:id
exports.deleteSurveyById = catchAsyncError(async (req, res, next) => {
  const deleteSurveyById = await Survey.findByIdAndDelete(req.params.id);

  if (!deleteSurveyById) {
    return next(new ErrorHandler("This survey does not exist...", 400));
  }

  res.status(200).json("survey deleted successfully...");
});

exports.deleteAllSurvey = catchAsyncError(async (req, res, next) => {
  await Survey.deleteMany({ user: req.user.id });

  res.status(200).json("survey deleted successfully...");
});
