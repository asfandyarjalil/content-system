const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    contestId: { type: mongoose.Schema.Types.ObjectId, ref: "Contest" },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        selectedOptions: [String], // store the option texts or IDs
      },
    ],
    score: { type: Number, default: 0 },

    submittedAt: Date,
    status: { type: Number, default: 0 }, //1 : in progress 2 :// completed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Participation", participationSchema);
