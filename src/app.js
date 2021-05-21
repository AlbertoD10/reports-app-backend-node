const express = require("express");
const { API_VERSION } = require("./config");
const app = express();

//Import Routes
const userRoutes = require("./routes/user");

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

//Header HTTP config

//Use Routes
app.use(`/api/${API_VERSION}`, userRoutes);

module.exports = app;
