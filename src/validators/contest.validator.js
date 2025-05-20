const Joi = require("joi");

const contestSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  description: Joi.string().min(2).max(50).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  startTime: Joi.number().required().messages({
    "number.base": "Start time must be a number (Unix timestamp).",
    "any.required": "Start time is required.",
  }),

  endTime: Joi.date().required().messages({
    "date.base": "End time must be a valid date.",
    "any.required": "End time is required.",
  }),
  prize: Joi.string().optional().allow("").messages({
    "string.base": "Prize must be a string.",
  }),
  access: Joi.string().valid("VIP", "NORMAL").optional().messages({
    "any.only": 'Access must be either "VIP" or "NORMAL".',
    "string.base": "Access must be a string.",
  }),
});
module.exports = {
  contestSchema,
};
