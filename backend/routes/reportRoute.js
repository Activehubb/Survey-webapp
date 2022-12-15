const express = require("express");
const { createReport, getReportById, deleteReport } = require("../controllers/reportController");
const router = express.Router();

// Admin || User
router.route("/report/create").post(createReport);
router.route("/report/:id").get( getReportById);
router.route("/report/:id").delete( deleteReport);

module.exports = router;
