const { validator } = require("../../helpers");
const { productSchemaValidator } = require("./productSchema");
const {
  productExits,
  createProduct,
  updateProduct,
  deleteProduct,
  allProducts,
  singleProduct,
} = require("./productRepository");

/**
 *
 * @param {object} req - new product object
 * @param {object} res - new mongodb product object
 */
exports.toCreate = async (req, res) => {
  try {
    // validate the input
    const validInputs = await validator(productSchemaValidator, req.body);

    // check of duplicates
    let product = await productExits(validInputs);
    if (product) {
      throw Error("Product already exists");
    }

    //create new product
    product = await createProduct({
      ...validInputs,
      businessOwner: req.user._id,
    });

    res.status(200).json({ message: "New Producted added", product });
  } catch (err) {
    res.status(501).json(err.message);
  }
};

/**
 *
 * @param {string, object} req - id and data to be updated
 * @param {object} res - returns an updated mongodb object
 */
exports.toUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    // check if product exists
    let product = await singleProduct(id);
    if (!product) {
      throw Error("Product not found");
    }

    product = await updateProduct(id, req.body);

    res.status(200).json({ message: "Updated Successfully", product });
  } catch (err) {
    res.status(501).json(err.message);
  }
};

/**
 *
 * @param {string} req - product id to be deleted
 */
exports.toDelete = async (req, res) => {
  const { id } = req.params;
  try {
    // check if product exists
    let product = await singleProduct(id);
    if (!product) {
      throw Error("Product not found");
    }

    const deleted = await deleteProduct(id);
    if (deleted) {
      res.status(200).json({ message: "Success. Product deleted" });
    }
  } catch (err) {
    res.status(501).json(err.message);
  }
};

/**
 *
 * @returns an array of objects containing products records
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await allProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(501).json(err.message);
  }
};

/**
 *
 * @param {string} req - product id
 * @return a mongodb object of a specific product
 */
exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await singleProduct(id);
    res.status(200).json({ message: "success", product });
  } catch (err) {
    res.status(501).json(err.message);
  }
};
