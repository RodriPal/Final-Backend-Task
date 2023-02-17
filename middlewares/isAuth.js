const { authService } = require("../services");

const isAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "No estas logueado!" });
  }

  const token = req.headers.authorization.split(" ")[1];
  const payload = authService.decodeToken(token);
  if (payload.message) {
    return res.status(401).send(message);
  }
  next();
};

module.exports = isAuth;