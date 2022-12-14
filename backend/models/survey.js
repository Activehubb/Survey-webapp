const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating Survey Models
const surveySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    question: {
      type: String,
    },
    questionType: {
      type: String,
      enum: {
        values: ["Multiple Choice", "Agree/Disagree", " Short Answer"],
      },
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

// Export surveySchema

module.exports = mongoose.model("Survey", surveySchema);
