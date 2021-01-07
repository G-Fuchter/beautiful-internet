const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const userValidation = require("../middleware/validation/user");

router.get("/register", usersController.getRegisterUser);

router.post(
  "/register",
  userValidation.newUser,
  usersController.postRegisterUser
);

router.get("/login", usersController.getLoginUser);

router.post("/login", usersController.postLoginUser);

router.post("/logout", usersController.postLogoutUser);

module.exports = router;
