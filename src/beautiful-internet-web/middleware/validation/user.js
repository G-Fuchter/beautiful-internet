const { checkSchema } = require("express-validator");
const User = require("../../models/user");

const checkConfirmationPassword = (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error("Password confirmation does not match password");
  }

  // Indicates the success of this synchronous custom validator
  return true;
};

const checkIfEmailExists = (value, { req }) => {
  return User.findOne({ email: value }).then((existingUser) => {
    if (existingUser !== null) {
      return Promise.reject("This email has already been used");
    }
    else {
      return true
    }
  });
};

exports.newUser = checkSchema({
  email: {
    in: "body",
    isEmail: {
      errorMessage: "Email format is incorrect",
    },
    normalizeEmail: true,
    custom: {
      errorMessage: "This emails has already been taken",
      options: checkIfEmailExists,
    },
  },
  name: {
    in: "body",
    isLength: {
      errorMessage: "Name should be 5 to 20 characters long",
      options: {
        min: 5,
        max: 20,
      },
    },
    isAlphanumeric: {
      errorMessage: "Name should contain only en-US alphanumeric characters",
      options: "en-US",
    },
    trim: {
      options: [" "],
    },
  },
  password: {
    in: "body",
    isStrongPassword: {
      options: {
        minLength: 6,
        minLowercase: 0,
        minSymbols: 0,
        minNumbers: 0,
        minUppercase: 0,
        returnScore: false,
      },
      errorMessage: "Password has to be at least 6 characters long",
    },
  },
  confirmPassword: {
    in: "body",
    custom: {
      errorMessage: "Passwords don't match",
      options: checkConfirmationPassword,
    },
  },
});
