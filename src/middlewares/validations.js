const { check, validationResult, param } = require("express-validator");

const validateUser = [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Ingrese un email válido")
    .normalizeEmail(),
  check("name").trim().notEmpty().withMessage("Ingrese su nombre"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Ingrese la contraseña")
    .custom((value, { req }) => value === req.body.repeatpassword)
    .withMessage("Las contraseñas no coinciden, verifique de nuevo"),

  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Ingrese un email válido")
    .normalizeEmail(),
  check("password").notEmpty().withMessage("Ingrese la contraseña"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateEmployee = [
  check("name").trim().notEmpty().withMessage("Ingrese el nombre"),
  check("lastname").trim().notEmpty().withMessage("Ingrese el apellido"),
  check("id").trim().notEmpty().withMessage("Ingrese el id"),
  check("position").trim().notEmpty().withMessage("Ingrese la posicion"),
  check("department").trim().notEmpty().withMessage("Ingrese el departamento"),
  check("supervisor")
    .trim()
    .notEmpty()
    .withMessage("Ingrese el supervisor del empleado"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateExpenses = [
  check("concept").trim().notEmpty().withMessage("Ingrese el concepto"),
  check("date").trim().notEmpty().withMessage("Ingrese la fecha"),
  check("id").trim().notEmpty().withMessage("Ingrese el id"),
  check("account").trim().notEmpty().withMessage("Ingrese la cuenta"),
  check("description").trim().notEmpty().withMessage("Ingrese la descripción"),
  check("total")
    .trim()
    .notEmpty()
    .withMessage("Ingrese el total")
    .isNumeric()
    .withMessage("Ingrese valor númerico"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateUser,
  validateLogin,
  validateEmployee,
  validateExpenses,
};
