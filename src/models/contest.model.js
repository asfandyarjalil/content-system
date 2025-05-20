const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    access: { type: String, enum: ["VIP", "NORMAL"], default: "NORMAL" },
    startTime: Number, // unix timestamps
    endTime: Date, // unix timestamps
    prize: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isCompleted: { type: Boolean, default: false },
    winBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // TODO
  },
  { timestamps: true }
);

contestSchema.index({ access: 1, startTime: 1, endTime: 1 });
module.exports = mongoose.model("Contest", contestSchema);
