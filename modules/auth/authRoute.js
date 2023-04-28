const auth = require("express").Router();
const { authenticateUser } = require("../../middlewares/authMiddleware");
const {
  signup,
  signin,
  initialResetPassword,
  resetPassword,
} = require("./authController");

// Signup route
auth.post("/auth/signup", signup);

// Signin route
auth.post("/auth/signin", signin);

// Intiate Password Reset
auth.post("/auth/reset", authenticateUser, initialResetPassword);

// change password
auth.post("/auth/change-password/:token", resetPassword);

module.exports = { auth };
