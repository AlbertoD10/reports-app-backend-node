const express = require("express");
const EmployeeController = require("../controllers/employee");
const md_validations = require("../middlewares/validations");
const md_auth = require("../middlewares/auth");
const api = express.Router();

api.post(
  "/add-employee",
  [md_auth.ensureAuth, md_validations.validateEmployee],
  EmployeeController.addEmployeeController
);
api.post(
  "/add-expense/:id",
  [md_auth.ensureAuth, md_validations.validateExpenses],
  EmployeeController.addExpenseController
);
api.get(
  "/get-all",
  [md_auth.ensureAuth],
  EmployeeController.getAllEmployeesController
);
api.get(
  "/get-employee/:id",
  [md_auth.ensureAuth],
  EmployeeController.getEmployeeController
);
module.exports = api;
