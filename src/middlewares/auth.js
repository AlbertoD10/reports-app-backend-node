const jwt = require("../services/jwt");
const { DateTime } = require("luxon");

function ensureAuth(req, res, next) {
  if (!req.headers.authorization) {
    res.status(403).send({
      message: "Petición no autorizada",
      status: 403,
    });
  }
  //To get the token
  // const token = req.headers.authorization.replace(/['"]+/g, "");
  const token = req.headers.authorization;
  const payload = jwt.decodedToken(token);

  try {
    if (payload.exp <= DateTime.now().toSeconds()) {
      return res
        .status(401)
        .send({ message: "El token de sesión ha caducado", status: 401 });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .send({ message: "El token de sesión es invalido", status: 404 });
  }
  req.user = payload;

  next();
}

module.exports = { ensureAuth };
