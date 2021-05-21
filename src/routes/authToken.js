const express = require("express");
const api = express.Router();
const tokenController = require("../controllers/authToken");

api.post("/refresh-access-token", tokenController.refreshAcessToken);

module.exports = api;
