const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already in use"],
    },
    role: {
      type: String,
      default: "customer",
    },
    resetPassword: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
exports.UserModel = mongoose.model("user", userSchema);

// Signup inputs validator
exports.userSchemaValidator = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required(),
  username: joi.string().required(),
});

// Signin input validator
exports.userSigninInputValidator = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required(),
});
