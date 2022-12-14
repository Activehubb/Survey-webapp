const catchAsyncError = require("../middlewares/catchAsyncError");
const Report = require("../models/report");

// Register/Create User => /api/v1/register
exports.createReport = catchAsyncError(async (req, res, next) => {
  const report = await Report.create(req.body);

  res.status(200).json(report);
});

// Get report details => /api/v1/admin/report/:id TODO

exports.getReportById = catchAsyncError(async (req, res, next) => {
  const report = await Report.findById(req.params.id);

  res.status(200).json({
    success: true,
    report,
  });
});

// Delete report => /api/v1/admin/report/:id TODO

exports.deleteReport = catchAsyncError(async (req, res, next) => {
  await Report.findById(req.params.id);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "report deleted successfully",
  });
});
