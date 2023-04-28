const mongoose = require("mongoose");
const joi = require("joi");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    businessOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

exports.ProductModel = mongoose.model("product", productSchema);

// product schema validator
exports.productSchemaValidator = joi.object({
  name: joi.string().required(),
  desc: joi.string().required(),
  price: joi.number().required(),
});
