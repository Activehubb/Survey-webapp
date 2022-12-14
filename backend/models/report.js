const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating Report Models
const reportSchema = new Schema(
  {
    survey: {
      type: Schema.Types.ObjectId,
      ref: "survey",
    },
    firstname: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    country: {
      type: String,
    },
    age: {
      type: String,
    },
    question_1: {
      type: String,
    },
    question_2: {
      type: String,
    },
    question_3: {
      type: String,
    },
    additional_message: {
      type: String,
    },
  },
  { timestamps: true }
);

// Export reportSchema

module.exports = mongoose.model("report", reportSchema);
