const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
    const decoreData = jwt.verify(token, secret);
    req.user = decoreData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Пользователь не авторизован" });
  }
};
