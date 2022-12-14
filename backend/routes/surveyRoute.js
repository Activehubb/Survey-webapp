const express = require("express");
const router = express.Router();
const { createSurvey, getAllSurvey, getSurveyById, updateSurvey, deleteSurveyById } = require("../controllers/surveyController");
const { isAuthenticated } = require("../middlewares/auth");

// Admin || User
router.route("/survey/create").post(isAuthenticated, createSurvey);
router.route("/survey/").get(getAllSurvey);
router.route("/survey/:id").get(isAuthenticated, getSurveyById);
router.route("/survey/:id").put(isAuthenticated, updateSurvey);
router.route("/survey/:id").delete(isAuthenticated, deleteSurveyById);

module.exports = router;
