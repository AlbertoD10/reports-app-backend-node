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

module.exports = { validateUser, validateLogin };
