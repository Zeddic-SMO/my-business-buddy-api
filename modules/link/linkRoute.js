const link = require("express").Router();
const { createProfile } = require("./linkController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middlewares/authMiddleware");

// Create Business Profile Route
link.post(
  "/link",
  authenticateUser,
  authorizeUser(["Business"]),
  createProfile
);

// Home Route
link.get("/", (req, res) => {
  res.status(200).json("WELCOME TO MY STORE");
});

module.exports = { link };
