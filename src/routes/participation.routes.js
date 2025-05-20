const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const ParticipationController = require("../controllers/participation.controller");
const validate = require("../middleware/validate.middleware");
const authorize = require("../middleware/role.middleware");
const {
  participationValidationSchema,
} = require("../validators/participation.validator");
const { contestIdParamSchema } = require("../validators/question.validator");
router.post(
  "/joinContest",
  auth,
  validate(contestIdParamSchema),
  ParticipationController.joinContest
);
router.post(
  "/submit",
  auth,
  validate(participationValidationSchema),
  ParticipationController.submitAnswers
);
router.get("/history", auth, ParticipationController.userHistory);

module.exports = router;
