const express = require("express");
const {
  registration,
  login,
  getUsers,
} = require("../controllers/authControler");
const router = express.Router();
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/api/v1/registration/",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Вы ввели неправильный пароль").isLength({
      min: 4,
      max: 50,
    }),
  ],
  registration
);
router.post("/api/v1/", login);
router.get("/api/v1/users/", authMiddleware, getUsers);

module.exports = router;
