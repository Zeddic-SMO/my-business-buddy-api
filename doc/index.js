const authRouteDocumentation = require("../modules/auth/user.doc");
const productRouteDocumentation = require("../modules/product/product.doc");
const linkRouteDocumentation = require("../modules/link/link.doc");

const swaggerDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "My-Business-Buddy",
    version: "1.0.0",
    contact: {
      name: " - Zeddic-SMO", // your name
      email: "samuel93ortil@gmail.com", // your email
    },
    description:
      "**MyBusinessBuddy** is a store and customer management system. \n\n ## Modules \n\n + **Users:** User can SignUp, SignIn and Reset Password *(email sending setup with Postmark)*. User authorization authorisation with JWT Tokens and user roles with a role field within the auth object on signup *(default user role should be ‘customer’)*\n\n  + **Store Link:** accepts business JSON data, validate the input data (accepting emails that ends with .com only). Then Generate a QRcode using the business unique id generated. \n\n + **Products:** Business  account holders can manage their own products and Customers can only fetch all products and view individual products.  \n\n + **Orders:** Business account holders can see the orders placed on their products while Customers can see the orders that they have placed.\n\n ## Technologies \n\n + NodeJS \n\n + Express \n\n + MongoDB \n\n + Joi, JWT, Postmark \n\n ## Some useful links: \n\n + [My-Business-Buddy repository](https://github.com/Zeddic-SMO/my-business-buddy-api)",
  },
  servers: [
    {
      url: "http://localhost:5000/api/v1",
      description: "Dev Server",
    },
    {
      url: "https://businessbuddy.onrender.com/api/v1",
      description: "Production Server",
    },
  ],
  tags: [
    {
      name: "User",
      description: "User [customer and busines] operations",
    },
    {
      name: "Store Link",
      description: "Generate the store's unique Id and QRcode",
    },
    {
      name: "Product",
      description: "Everything about the products",
    },
    {
      name: "Order",
      description: "All about business orders",
    },
  ],
  paths: {
    ...productRouteDocumentation,
    ...authRouteDocumentation,
    ...linkRouteDocumentation,
  },
};

module.exports = swaggerDocumentation;
