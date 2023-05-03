const Joi = require("joi");

exports.createProfileSchema = Joi.object({
  businessName: Joi.string().required(),
  businessAddress: Joi.string().required(),
  businessContactNumber: Joi.number().required(),
  businessContactEmail: Joi.string()
    .required()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } }),
});
