const link = require("express").Router();
const { createProfile } = require("./controller");

// Create Business Profile Route
link.post("/profile", createProfile);

// Home Route
link.get("/", (req, res) => {
  res.status(200).json("WELCOME TO MY STORE");
});

module.exports = {link};