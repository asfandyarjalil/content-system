const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const PrizeController = require("../controllers/prize.controller");

router.get("/:contestId/winner", auth, PrizeController.getContestWinner);

module.exports = router;
