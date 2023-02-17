const jwt = require("jwt-simple");
const { DateTime } = require("luxon");

const createToken = () => {
  const payload = {
    iat: DateTime.now().toMillis(),
    exp: DateTime.now().plus({ minutes: 30 }),
  };
  return jwt.encode(payload, process.env.JWT_SECRET);
};

const decodeToken = (token) => {
  let payload;
  try {
    payload = jwt.decode(token, process.env.JWT_SECRET);
    if (payload.exp <= DateTime.now().toMillis()) {
      return { message: "El token ha expirado!" };
    }
  } catch (error) {
    console.log(error);
  }
  return payload;
};

module.exports = {
  createToken,
  decodeToken,
};