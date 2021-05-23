const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* 
---Opciones de busqueda-----
concepto (Esto es para busqueda, eje: concepto de arrendamiento, prestamo, etc.)
fechas (Busqueda, ej: 15/1/2021 hasta 20/1/2021)

-----Datos empleado -----
Nombre
Apellido
posición
departamento
supervisor
------Datos del row prestamo ------
Gastos tendra:
    concepto : objeto con nombres
    fecha: objeto de fechas
    cuenta: objeto, ej: ventas y marketing
    descripcion: casado a cuenta
    total
*/
//Child Schema
const ExpensesEmployee = Schema({
  concept: String,
  date: Date,
  account: String,
  description: String,
  total: Number,
});

//Parent Schema
const EmployeeSchema = Schema({
  id: {
    unique: true,
    type: String,
  },
  name: String,
  lastname: String,
  position: String,
  department: String,
  supervisor: String,
  expenses: [ExpensesEmployee],
  approvedBy: String,
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

function addEmployee(data, callback) {
  let Employee = new EmployeeModel(data);

  Employee.save((err, userData) => {
    if (err) {
      if (err.code === 11000) {
        callback({ message: "Este empleado ya está registrado", status: 409 });
      } else {
        console.log(err.code);
        callback({ message: "Ha ocurrido un error", status: 500 });
      }
    } else {
      if (!userData) {
        callback({
          message: "Error al crear el empleado, intente nuevamente",
          status: 404,
        });
      } else {
        callback({ message: "Empleado creado correctamente", status: 200 });
      }
    }
  });
}

function addExpense(user_id, data, callback) {
  // let Expense = new ExpensesEmployee(data);

  EmployeeModel.findOneAndUpdate(
    user_id,
    { $push: { expenses: data } },
    (err, userStored) => {
      if (err) {
        console.log(err);
        callback({ message: "Ha ocurrido un error", status: 500 });
      } else {
        if (!userStored) {
          callback({ message: "Empleado no encontrado", status: 404 });
        } else {
          callback({ message: "Registro agregado correctamente", status: 200 });
        }
      }
    }
  );
}

function getAllEmployees(callback) {
  EmployeeModel.find({})
    .sort({ order: "asc" })
    .exec((err, allEmployees) => {
      if (err) {
        callback({
          message: "Ha ocurrido un error en el servidor",
          status: 500,
        });
      } else {
        if (!allEmployees) {
          callback({
            message: "No se han encontrado usuarios",
            status: 404,
          });
        } else {
          callback({
            employees: allEmployees,
            status: 200,
          });
        }
      }
    });
}

function getEmployee(employee, callback) {
  EmployeeModel.findOne(employee, (err, userStored) => {
    if (err) {
      console.log(err);
      callback({ message: "Ha ocurrido un error", status: 500 });
    } else {
      if (!userStored) {
        callback({ message: "Empleado no encontrado", status: 404 });
      } else {
        callback({ userStored, status: 200 });
      }
    }
  });
}

module.exports = {
  addEmployee,
  addExpense,
  getAllEmployees,
  getEmployee,
};
