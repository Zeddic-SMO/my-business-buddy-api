const mongoose = require("mongoose");
const { ProductModel } = require("./productSchema");

/**
 *
 * @param {object} data - product object
 * @returns a mongodb object of a single product
 */
exports.productExits = async (data) => {
  try {
    const isExists = await ProductModel.findOne({ name: data.name });
    return isExists;
  } catch (err) {
    throw Error(err);
  }
};

/**
 *
 * @param {object} data - New product object
 * @returns mongodb object of a new created product
 */
exports.createProduct = async (data) => {
  try {
    const newProduct = await ProductModel.create(data);
    return newProduct;
  } catch (err) {
    throw Error(err);
  }
};

/**
 *
 * @param {string} id of Product to be updated
 * @param {object} data to be set
 * @returns updated product
 */
exports.updateProduct = async (id, data) => {
  try {
    const updated = await ProductModel.findByIdAndUpdate(id, {
      $set: data,
    });
    return updated;
  } catch (err) {
    throw Error(err);
  }
};

/**
 *
 * @param {string} id of product to be deleted
 * @returns the deleted object
 */
exports.deleteProduct = async (id) => {
  try {
    const deleted = await ProductModel.findByIdAndDelete(id);
    return deleted;
  } catch (err) {
    throw Error(err);
  }
};

/**
 *
 * @returns an array of Objects containing all products
 */
exports.allProducts = async () => {
  try {
    const products = await ProductModel.find({});
    return products;
  } catch (err) {
    throw Error(err);
  }
};

/**
 *
 * @param {string} id
 * @returns a single mongodb object
 */
exports.singleProduct = async (id) => {
  try {
    const product = await ProductModel.findOne({ _id: id });
    return product;
  } catch (err) {
    throw Error(err);
  }
};
