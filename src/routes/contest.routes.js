const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const ContestController = require("../controllers/contest.controller");
const validate = require("../middleware/validate.middleware");
const { contestSchema } = require("../validators/contest.validator");
const {
  questionValidationSchema,
  contestIdParamSchema,
} = require("../validators/question.validator");

// Admin-only
router.post(
  "/",
  auth,
  authorize("ADMIN"),
  validate(contestSchema),
  ContestController.createContest
);
router.post(
  "/:contestId/questions",
  auth,
  authorize("ADMIN"),
  validate(contestIdParamSchema, "params"),
  validate(questionValidationSchema),
  ContestController.addQuestion
);

// Authenticated users
router.get("/", auth, ContestController.getAllContests);

module.exports = router;
