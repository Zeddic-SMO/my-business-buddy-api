require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocumentation = require("./doc");
const app = express();
const { DbConnect } = require("./config/db");

// middlewares
app.use(express.json());

// Swagger Documentation
app.use("/", swaggerUi.serve);
app.use("/", swaggerUi.setup(swaggerDocumentation));

// routes
const { link } = require("./modules/link/linkRoute");
const { auth } = require("./modules/auth/authRoute");
const { product } = require("./modules/product/productRoute");
app.use("/api/v1", link);
app.use("/api/v1", auth);
app.use("/api/v1", product);

// Connection to DB and starting server
const port = process.env.PORT || 5000;

// dependency injection
DbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Server is Running on Port ${port} and DB Connection Successful`
      );
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
