// Modules
const path = require("path");

// Business Profile Schema
const Profile = require("../models/Profile");

// Helper functions
const authProfileSchema = require("../helpers/schemaValidator");
const idGenerator = require("../helpers/IdGenerator");
const QrCode = require("../helpers/QrGenerator");

const createProfile = async (req, res) => {
  try {
    // Validate the input data. (we only need emails that ends with .com)
    const schemaResult = await authProfileSchema.validateAsync(req.body);

    // Check if Business with Email already exists
    const emailCheck = await Profile.findOne({ email: schemaResult.email });

    // Check if business with Phone Number already exists
    const phoneCheck = await Profile.findOne({
      phoneNumber: schemaResult.phoneNumber,
    });

    // Throw Error if Email or Phone Number already exists
    if (emailCheck) {
      throw Error("Email already in use");
    }
    if (phoneCheck) {
      throw Error("Phone Number already in use");
    }

    //Generate a unique 7 character id for the business
    const Business_Id = idGenerator();

    // Generate a qrcode using the unique id generated
    const { QrUrl } = QrCode(Business_Id);
    // console.log(QrUrl);

    // Saving the Business record to database
    const newBusProfile = await Profile.create({
      ...schemaResult,
      businessId: Business_Id,
      businessQRCode: QrUrl,
    });
    console.log(newBusProfile);

    //  Send a message back to the user as a json response containing - response =  { "link": "http://bus.me/[id]" }
    res.status(200).send({ link: `http://bus.me/${Business_Id}` });
  } catch (err) {
    res.status(402).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = { createProfile };
