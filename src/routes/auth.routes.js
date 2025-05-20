const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate.middleware");
const AuthController = require("../controllers/auth.controller");
const { signupSchema, loginSchema } = require("../validators/auth.validator");

router.post("/signup", validate(signupSchema), AuthController.signup);
router.post("/login", validate(loginSchema), AuthController.login);

module.exports = router;
