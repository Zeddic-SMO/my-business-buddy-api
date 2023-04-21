require("dotenv").config();
const express = require("express");
const app = express();
const DbConnect = require("./config/db");
const router = require("./routes/ProfileRoutes");

// middlewares
app.use(express.json());
app.use("/api/v1", router);

// Connection to DB and starting server
const port = process.env.PORT || 5000;
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
