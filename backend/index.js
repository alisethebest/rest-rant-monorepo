// Modules and Globals
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken"); // Include JWT if you need it here
const authController = require("./controllers/authController");

// Express Settings
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Controllers & Routes
app.get("/current-user", authController.getCurrentUser); // Use the controller method
app.use("/places", require("./controllers/places"));
app.use("/users", require("./controllers/users"));

// Listen for Connections
app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
