const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    contestId: { type: mongoose.Schema.Types.ObjectId, ref: "Contest" },
    type: { type: String, enum: ["SINGLE", "MULTI", "TF"], required: true },
    questionText: String,
    options: [
      {
        text: String,
        isCorrect: Boolean,
      },
    ],
    points: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
