const {
  authenticateUser,
  authorizeUser,
} = require("../../middlewares/authMiddleware");
const {
  toCreate,
  toUpdate,
  toDelete,
  getProducts,
  getProduct,
} = require("./productController");

const product = require("express").Router();

/*****************************************************************************************
 * @Business roles
 */
// Create new Product - @aBusiness access
product.post(
  "/product",
  authenticateUser,
  authorizeUser(["Business"]),
  toCreate
);
// Update existing Product - @Business access
product.put(
  "/product/:id",
  authenticateUser,
  authorizeUser(["Business"]),
  toUpdate
);
// Delete Product - @Business access
product.delete(
  "/product/:id",
  authenticateUser,
  authorizeUser(["Business"]),
  toDelete
);

/*****************************************************************************************
 * @customer roles
 */
//Fetch all the products - @customer access
product.get("/product", authenticateUser, getProducts);
// View individual product - @customer access
product.get("/product/:id", authenticateUser, getProduct);

module.exports = { product };
