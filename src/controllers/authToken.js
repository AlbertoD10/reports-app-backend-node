const jwt = require("../services/jwt");
const UserModel = require("../models/user");
const { DateTime } = require("luxon");

//Verify if the token is expired
function isRefreshExpired(token) {
  const currentTime = DateTime.now().toSeconds();

  if (currentTime > token.exp) {
    console.log("Token expirado");
    return true;
  }
  return false;
}

function refreshAcessToken(req, res) {
  const { refreshToken } = req.body;
  const decodedToken = jwt.decodedToken(refreshToken);

  const isTokenExpired = isRefreshExpired(decodedToken);
  //If the refresh token is active, create a new access token
  if (isTokenExpired) {
    res.status(500).send({ message: "La sesión ha caducado" });
  } else {
    UserModel.getUser(decodedToken.id, result => {
      if (result.status === 200) {
        res.status(200).send({
          accessToken: jwt.createAccessToken(result.userStored),
          refreshToken: refreshToken,
          status: 200,
        });
      } else {
        res.status(result.status).send(result);
      }
    });
  }
}

module.exports = {
  refreshAcessToken,
};
