const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/user");

exports.getRegisterUser = (req, res, next) => {
  res.render("user/register", {
    title: "Register",
    oldInput: null,
    errorMessages: [],
  });
};

exports.getLoginUser = (req, res, next) => {
  res.render("user/login", { title: "Log In" });
};

exports.postLoginUser = (req, res, next) => {
  const { password, email } = req.body;

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // TODO: ERROR HANDLING
        console.log("No user found with that email");
        return res.redirect("/users/login");
      }
      bcrypt.compare(password, foundUser.password).then((isAMatch) => {
        if (isAMatch) {
          req.session.user = foundUser;
          return req.session.save((err) => {
            //TODO ERROR HANDLING
            console.log(err);
            res.redirect("/");
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postRegisterUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  const oldInput = { name, email };
  if (!errors.isEmpty()) {
    let errorMessages = errors.array().map((x) => x.msg);
    return res.status(422).render("user/register", {
      title: "Register",
      oldInput,
      errorMessages,
    });
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        votes: 0,
      });
      return newUser.save();
    })
    .then((result) => {
      res.redirect("/users/login");
    });
};
