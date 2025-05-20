const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).+$")) // At least 1 uppercase, 1 lowercase, and 1 number
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must not exceed 30 characters",
      "string.pattern.base":
        "Password must contain uppercase, lowercase letters, and a number",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  role: Joi.string().valid("ADMIN", "VIP", "NORMAL").optional().messages({
    "any.only": "Role must be one of ADMIN, VIP, or NORMAL",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

module.exports = {
  signupSchema,
  loginSchema,
};
