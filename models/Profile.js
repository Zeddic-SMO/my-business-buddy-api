const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone Number is reqyuired"],
    unique: [true, "Phone Number already in use"],
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: [true, "Email already in use"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  businessId: {
    type: String,
    required: true,
  },
  businessQRCode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
