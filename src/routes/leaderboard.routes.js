const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const LeaderboardController = require("../controllers/leaderboard.controller");

router.get("/", auth, LeaderboardController.getLeaderboard);

module.exports = router;
