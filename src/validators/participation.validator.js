const Joi = require("joi");
const mongoose = require("mongoose");

const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};
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
const participationValidationSchema = Joi.object({
  participationId: Joi.string()
    .custom(objectIdValidator, "ObjectId validation")
    .required()
    .messages({
      "any.required": "participationId ID is required.",
      "any.invalid": "participationId must be a valid ObjectId.",
    }),

  answers: Joi.array()
    .items(
      Joi.object({
        questionId: Joi.string()
          .custom(objectIdValidator, "ObjectId validation")
          .required()
          .messages({
            "any.required": "Question ID is required.",
            "any.invalid": "Question ID must be a valid ObjectId.",
          }),
        selectedOptions: Joi.array()
          .items(Joi.string().min(1))
          .min(1)
          .required()
          .messages({
            "array.base": "Selected options must be an array.",
            "array.min": "At least one selected option is required.",
          }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Answers must be an array.",
      "array.min": "At least one answer must be provided.",
    }),
  status: Joi.number().required().messages({
    "number.base": "status must be a number.",
    "any.required": "Status time is required.",
  }),
});

module.exports = { contestIdParamSchema, participationValidationSchema };
