const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.get("/register", usersController.getRegisterUser);

router.post("/register", usersController.postRegisterUser);

router.get("/login", usersController.getRegisterUser);

module.exports = router;
