const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

async function registration(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Ошибка при регистрации" });
    }
    const { username, password } = req.body;
    const candidate = await User.findOne({ username });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "Такой пользователь уже существует" });
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new User({ username, password: hashPassword });
    await user.save();
    return res.json({ message: "Успешно зарегистрирован" });
  } catch (e) {
    console.log(e);
  }
}

function generateAccesToken(id) {
  const payload = { id };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: `Пользователь ${username} не найден` });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Введен неверный пароль" });
    }
    const token = generateAccesToken(user._id);
    return res.json({ token });
  } catch (e) {
    console.log(e);
  }
}

async function getUsers(req, res) {
  try {
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  registration,
  login,
  getUsers,
};
