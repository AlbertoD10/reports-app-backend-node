const express = require("express");
const UserController = require("../controllers/user");
const md_validations = require("../middlewares/validations");
const api = express.Router();

api.post(
  "/sign-up",
  [md_validations.validateUser],
  UserController.signUpController
);
api.post(
  "/login",
  [md_validations.validateLogin],
  UserController.loginController
);

module.exports = api;
