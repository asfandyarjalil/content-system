const Joi = require("joi");
const mongoose = require("mongoose");

// Custom ObjectId validator
const contestIdParamSchema = Joi.object({
  contestId: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "ObjectId validation")
    .messages({
      "string.base": "Contest ID must be a string.",
      "any.required": "Contest ID is required in the URL.",
      "any.invalid": "Contest ID must be a valid MongoDB ObjectId.",
    }),
});

const questionValidationSchema = Joi.object({
  type: Joi.string().valid("SINGLE", "MULTI", "TF").required().messages({
    "string.base": "Type must be a string.",
    "any.only": 'Type must be one of "SINGLE", "MULTI", or "TF".',
    "any.required": "Question type is required.",
  }),

  questionText: Joi.string().required().messages({
    "string.base": "Question text must be a string.",
    "any.required": "Question text is required.",
  }),

  options: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().required().messages({
          "string.base": "Option text must be a string.",
          "any.required": "Option text is required.",
        }),
        isCorrect: Joi.boolean().required().messages({
          "boolean.base": "isCorrect must be a boolean.",
          "any.required": "isCorrect is required.",
        }),
      })
    )
    .min(2)
    .required()
    .messages({
      "array.base": "Options must be an array.",
      "array.min": "At least 2 options are required.",
      "any.required": "Options are required.",
    }),

  points: Joi.number().integer().min(0).default(1).messages({
    "number.base": "Points must be a number.",
    "number.integer": "Points must be an integer.",
    "number.min": "Points cannot be negative.",
  }),
});

module.exports = { contestIdParamSchema, questionValidationSchema };
