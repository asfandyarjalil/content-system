const Contest = require("../models/contest.model");
const Question = require("../models/question.model");

exports.createContest = async (req, res) => {
  try {
    const contest = new Contest({ ...req.body, createdBy: req.user.id });
    await contest.save();
    res.status(201).json({ message: "Contest created", contest });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const question = new Question({
      ...req.body,
      contestId: req.params.contestId,
    });
    await question.save();
    res.status(201).json({ message: "Question added", question });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getAllContests = async (req, res) => {
  try {
    const role = req.user?.role || "GUEST";
    let query = {};
    //  TODO filters start time vs end time

    if (role === "NORMAL") query.access = "NORMAL";
    else if (role === "VIP" || role === "ADMIN")
      query.access = { $in: ["NORMAL", "VIP"] };

    const contestsWithQuestions = await Contest.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "questions",
          localField: "_id",
          foreignField: "contestId",
          as: "questions",
        },
      },
    ]);

    res.json({ contests: contestsWithQuestions });
  } catch (err) {
    console.error("Error fetching contests:", err);
    res.status(500).json({ error: "Failed to fetch contests." });
  }
};
