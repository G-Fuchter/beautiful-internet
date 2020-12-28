const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.get("/register", usersController.getRegisterUser);

router.post("/register", usersController.postRegisterUser);

router.get("/login", usersController.getLoginUser);

router.post("/login", usersController.postLoginUser);

module.exports = router;
