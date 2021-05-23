const EmployeeModel = require("../models/employee");

function addEmployeeController(req, res) {
  const employee = req.body;

  console.log(employee);
  EmployeeModel.addEmployee(employee, result => {
    res.status(result.status).send(result);
  });
}

function addExpenseController(req, res) {
  const expense = req.body;
  const user_id = req.params;

  console.log(user_id);
  EmployeeModel.addExpense(user_id, expense, result => {
    res.status(result.status).send(result);
  });
}

function getAllEmployeesController(req, res) {
  EmployeeModel.getAllEmployees(result => {
    res.status(result.status).send(result);
  });
}

function getEmployeeController(req, res) {
  const data = req.params;

  console.log(data);

  EmployeeModel.getEmployee(data, result => {
    res.status(result.status).send(result);
  });
}

module.exports = {
  addEmployeeController,
  addExpenseController,
  getAllEmployeesController,
  getEmployeeController,
};
