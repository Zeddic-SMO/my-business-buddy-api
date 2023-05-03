const mongoose = require("mongoose");

// This is the mongoose schema
const ProfileSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, "First Name is required"],
  },
  businessAddress: {
    type: String,
    required: [true, "Last Name is required"],
  },
  businessContactNumber: {
    type: Number,
    required: [true, "Phone Number is reqyuired"],
    unique: [true, "Phone Number already in use"],
  },
  businessContactEmail: {
    type: String,
    required: [true, "Email address is required"],
    unique: [true, "Email already in use"],
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
const ProfileModel = mongoose.model("storelink", ProfileSchema);

/**
 *
 * @param {Object} data - user object
 * @returns A database object from mongodb
 */
exports.emailOrPhoneCheck = async (data) => {
  try {
    return await ProfileModel.findOne({
      $or: [
        { businessContactEmail: data.businessContactEmail },
        { businessContactNumber: data.businessContactNumber },
      ],
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
