const jwt = require("jsonwebtoken");
const { DateTime } = require("luxon");
const SECRET_KEY = "FySYS2xMV8UeKhMNRzDlzGIj3lijVrPb";

createAccessToken = function (user) {
  const payload = {
    email: user.email,
    name: user.name,
    exp: DateTime.now().plus({ hour: 2 }).toSeconds(),
  };
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

//restart the access token if is active
createRefreshToken = function (user) {
  const payload = {
    id: user._id,
    exp: DateTime.now().plus({ days: 30 }).toSeconds(),
  };

  const token = jwt.sign(payload, SECRET_KEY);

  return token;
};

decodedToken = function (token) {
  try {
    const verify = jwt.verify(token, SECRET_KEY);
    return verify;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createAccessToken,
  createRefreshToken,
  decodedToken,
};
