const cron = require("node-cron");
const mongoose = require("mongoose");
const Contest = require("../models/contest.model");
// Run every minute (adjust frequency as needed)
cron.schedule("* * * * *", async () => {
  try {
    console.log("Running contest completion cron job...");

    const now = Math.floor(Date.now() / 1000);
    // Find contests that ended and are not yet marked as completed
    const result = await Contest.updateMany(
      {
        isCompleted: false,
        endTime: { $lt: now },
      },
      {
        $set: { isCompleted: true },
      }
    );

    console.log(`Updated ${result.modifiedCount} contests to completed.`);
  } catch (error) {
    console.error("Error in contest completion cron job:", error);
  }
});
