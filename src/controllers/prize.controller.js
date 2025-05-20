const Participation = require("../models/participation.model");
const Contest = require("../models/contest.model");
const User = require("../models/user.model");

exports.getContestWinner = async (req, res) => {
  const { contestId } = req.params;

  const participation = await Participation.find({ contestId, completed: true })
    .sort({ score: -1, submittedAt: 1 })
    .limit(1)
    .populate("userId", "name email role");

  if (!participation.length)
    return res.status(404).json({ error: "No participants yet" });

  const winner = participation[0];
  const contest = await Contest.findById(contestId);

  res.json({
    contest: contest.name,
    winner: {
      name: winner.userId.name,
      email: winner.userId.email,
      role: winner.userId.role,
      score: winner.score,
      prize: contest.prize,
    },
  });
};
