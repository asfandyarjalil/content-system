const Participation = require("../models/participation.model");
const Contest = require("../models/contest.model");
const User = require("../models/user.model");

// List of All contest and their winner
exports.getLeaderboard = async (req, res) => {
  try {
    // Fetch all contests
    const contests = await Contest.find({ isCompleted: true });

    if (!contests.length) {
      return res.status(404).json({ error: "No contests found." });
    }

    const leaderboard = [];

    for (const contest of contests) {
      //  TODO Implement Redis Cache
      // TODO update  the contest winner in contest collection 
      const topScorer = await Participation.findOne({
        contestId: contest._id,
        status: 2,
      })
        .populate("userId", "name role")
        .sort({ score: -1, submittedAt: 1 }) // Highest score, earliest submission
        .lean();

      leaderboard.push({
        contestId: contest._id,
        contestName: contest.name,
        winner: topScorer
          ? {
              name: topScorer.userId.name,
              role: topScorer.userId.role,
              score: topScorer.score,
              submittedAt: topScorer.submittedAt,
            }
          : null,
      });
    }

    res.json({ leaderboard });
  } catch (err) {
    console.error("Error in getLeaderboard:", err);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching leaderboard." });
  }
};
