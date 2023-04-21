const router = require("express").Router();
const { createProfile } = require("../controllers/BusinessLogic");

// Create Business Profile Route
router.post("/profile", createProfile);

// Home Route
router.get("/", (req, res) => {
  res.status(200).json("WELCOME TO MY STORE");
});

module.exports = router;
