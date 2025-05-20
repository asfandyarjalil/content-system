const Participation = require("../models/participation.model");
const Question = require("../models/question.model");
const Contest = require("../models/contest.model");

exports.joinContest = async (req, res) => {
  try {
    const { contestId } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;
    // check if contest exits
    let contest = await Contest.findById({ _id: contestId });
    if (!contest) {
      return res.status(400).json({ error: "Contest doesn't exists." });
    }
    if (contest.endTime <= Math.floor(Date.now() / 1000)) {
      return res.status(400).json({ error: "This contest has already ended." });
    }
    if (
      contest.access === "VIP" &&
      userRole === "NORMAL" // only NORMAL users should be restricted
    ) {
      return res.status(403).json({ error: "Access denied: VIP contest" });
    }
    // 2. Prevent double joining
    const existing = await Participation.findOne({ userId, contestId });
    if (existing) {
      return res
        .status(400)
        .json({ error: "You have already started this contest." });
    }
    let participation = await Participation.create({
      userId,
      contestId,
    });
    res.status(201).json({
      message: "Successfully participated in contest.",
      participation: { id: participation._id },
    });
  } catch (err) {
    console.error("Error in submitAnswers:", err);
    res
      .status(500)
      .json({ error: "Something went wrong while submitting answers." });
  }
};
exports.submitAnswers = async (req, res) => {
  try {
    const { participationId, answers, status } = req.body;
    // TODO middlerware tocheck the user role who is answering like NORMAL can submit any asnwer of VIP roles.
    const existing = await Participation.findOne({ _id: participationId });
    if (!existing) {
      return res
        .status(400)
        .json({ error: "You have not joined this contest." });
    }
    // 3. Fetch all questions for this contest
    const questions = await Question.find({
      contestId: existing.contestId,
    }).lean();

    const questionMap = {};
    for (let q of questions) {
      questionMap[q._id.toString()] = q;
    }

    // 4. Validate submitted answers
    for (let ans of answers) {
      if (!ans.questionId || !Array.isArray(ans.selectedOptions)) {
        return res.status(400).json({ error: "Invalid answer format." });
      }
      if (!questionMap[ans.questionId]) {
        return res
          .status(400)
          .json({ error: `Invalid question ID: ${ans.questionId}` });
      }
    }

    // 5. Scoring logic
    let totalScore = 0;
    for (let ans of answers) {
      const q = questionMap[ans.questionId];
      const correctAnswers = q.options
        .filter((opt) => opt.isCorrect)
        .map((opt) => opt.text)
        .sort();

      const submitted = [...ans.selectedOptions].sort();

      const isCorrect =
        q.type === "SINGLE" || q.type === "TF"
          ? submitted.length === 1 &&
            correctAnswers.length === 1 &&
            submitted[0] === correctAnswers[0]
          : JSON.stringify(submitted) === JSON.stringify(correctAnswers);

      if (isCorrect) {
        totalScore += q.points;
      }
    }

    // 6. Save participation
    const participation = await Participation.findByIdAndUpdate(
      { _id: participationId },
      {
        answers,
        score: totalScore,
        completed: true,
        submittedAt: new Date(),
        status: status,
      },
      { new: true }
    );
    if (!participation) {
      console.error("Error in submitAnswers:", err);
      res
        .status(500)
        .json({ error: "Something went wrong while submitting answers." });
    }
    res.json({ message: "Answers submitted", score: totalScore });
  } catch (err) {
    console.error("Error in submitAnswers:", err);
    res
      .status(500)
      .json({ error: "Something went wrong while submitting answers." });
  }
};

exports.userHistory = async (req, res) => {
  const participations = await Participation.find({ userId: req.user.id })
    .populate("contestId")
    .sort({ submittedAt: -1 });

  res.json({ history: participations });
};
