const Joi = require("joi");

exports.createProfileSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.number().required(),
  email: Joi.string()
    .required()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } }),
  message: Joi.string().required(),
});
