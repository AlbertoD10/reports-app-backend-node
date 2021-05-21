const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

//Instace for manipulating the schema
const UserModel = mongoose.model("User", UserSchema);

function signUp(data, callback) {
  let User = new UserModel(data);

  console.log(data);

  User.save((err, userData) => {
    if (err) {
      if (err.code === 11000) {
        callback({ message: "Este email ya está registrado", status: 409 });
      } else {
        console.log(err.code);
        callback({ message: "Ha ocurrido un error", status: 500 });
      }
    } else {
      if (!userData) {
        callback({
          message: "Error al crear el usuario, intente nuevamente",
          status: 404,
        });
      } else {
        callback({ message: "Usuario creado correctamente", status: 200 });
      }
    }
  });
}

function login(data, callback) {
  console.log(data);
  UserModel.findOne({ email: data.email }, (err, userStored) => {
    if (err) {
      console.log(err);
      callback({ message: "Ha ocurrido un error", status: 500 });
    } else {
      if (!userStored) {
        callback({ message: "Email no registrado", status: 404 });
      } else {
        callback({ userStored, status: 200 });
      }
    }
  });
}

module.exports = {
  signUp,
  login,
};
