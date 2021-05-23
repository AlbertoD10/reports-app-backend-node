const express = require("express");
const { API_VERSION } = require("./config");
const app = express();

//Import Routes
const userRoutes = require("./routes/user");
const employeRoutes = require("./routes/employee");
const refreshTokenRoutes = require("./routes/authToken");

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

//Header HTTP config
//To avoid the CORS in dev
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Use Routes
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, employeRoutes);
app.use(`/api/${API_VERSION}`, refreshTokenRoutes);

module.exports = app;
