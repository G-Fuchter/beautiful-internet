const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getRegisterUser = (req, res, next) => {
  res.render("user/register", {
    title: "Register"
  })
}

exports.postRegisterUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        // TODO: ERROR
        return res.redirect("/users/register");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const newUser = new User({
            email,
            password: hashedPassword,
            name,
            votes: 0
          });
          return newUser.save();
        })
        .then((result) => {
          res.redirect("/users/login");
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
};
