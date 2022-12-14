const express = require("express");
const router = express.Router();

// Admin || User
router.route("/report/create").post( createreport);
router.route("/report/").get(getAllreport);
router.route("/report/:id").get( getreportById);
router.route("/report/:id").delete( deleteSurveyById);

module.exports = router;
