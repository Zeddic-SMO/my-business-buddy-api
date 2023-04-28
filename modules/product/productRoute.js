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
// Create new Product - @admin access
product.post(
  "/product/create",
  authenticateUser,
  authorizeUser(["admin"]),
  toCreate
);
// Update existing Product - @admin access
product.put(
  "/product/:id",
  authenticateUser,
  authorizeUser(["admin"]),
  toUpdate
);
// Delete Product - @admin access
product.delete(
  "/product/:id",
  authenticateUser,
  authorizeUser(["admin"]),
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
