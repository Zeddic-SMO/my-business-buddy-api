const mongoose = require("mongoose");

// This is the mongoose schema
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

// This is the mongoose model
const ProfileModel = mongoose.model("Profile", ProfileSchema);

/**
 *
 * @param {Object} data - user object
 * @returns A database object from mongodb
 */
exports.emailOrPhoneCheck = async (data) => {
  try {
    return await ProfileModel.findOne({
      $or: [{ email: data.email }, { phoneNumber: data.phoneNumber }],
    });
  } catch (err) {
    throw Error(err);
  }
};

/**
 * 
 * @param {Object} data - new business object
 * @returns mongodb database record
 */
exports.createNewBusiness = async (data) => {
  try {
    return await ProfileModel.create(data);
  } catch (err) {
    throw Error(err);
  }
};