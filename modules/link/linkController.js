// Modules
const path = require("path");

// Helper functions
const { idGenerator, QrCode, validator, Response } = require("../../helpers");

// schema object
const { createProfileSchema } = require("./linkSchema");

// business model
const { model } = require("./linkModel");

// This would create a business profile

exports.createProfile = async (req, res) => {
  try {
    // TODO: make a single database request to
    // verify if data already exist before saving

    // Validate the input data. (we only need emails that ends with .com)
    const schemaResult = await validator(createProfileSchema, req.body);

    // Check if Business with Email or Phone Number already exists
    // Throw Error if Email or Phone Number already exists
    if (await model.emailOrPhoneCheck(schemaResult)) {
      throw Response(409, "Data already exist in our records");
    }

    // await model.emailOrPhoneCheck(data)
    //     .createBusinessId(data)
    //     .generateQRCode(data)
    //     .createNewBusinessRecord(data)

    //Generate a unique 7 character id for the business
    const Business_Id = idGenerator();

    // Generate a qrcode using the unique id generated
    const { QrUrl } = QrCode(Business_Id);

    // Saving the Business record to database
    const newBusinessRecord = {
      ...schemaResult,
      businessId: Business_Id,
      businessQRCode: QrUrl,
    };

    // saving our data into the database
    await model.createNewBusiness(newBusinessRecord);

    //  Send a message back to the user as a json response containing - response =  { "link": "http://bus.me/[id]" }
    res
      .status(200)
      .send({ status: "Ok", link: `http://bus.me/${Business_Id}` });
  } catch (err) {
    res.status(err.status).json({
      status: "fail",
      message: err.message,
    });
  }
};
