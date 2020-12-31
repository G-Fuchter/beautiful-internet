const { checkSchema } = require("express-validator");

const checkConfirmationPassword = (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('Password confirmation does not match password');
  }

  // Indicates the success of this synchronous custom validator
  return true;
}

exports.newUser = checkSchema({
  email: {
    in: "body",
    isEmail: {
      errorMessage: "Email format is incorrect",
    },
    normalizeEmail: true
  },
  name: {
    in: "body",
    isLength: {
      errorMessage: "Name should be 5 to 20 characters long",
      options: {
        min: 5,
        max: 20
      }
    },
    isAlphanumeric: {
      errorMessage: "Name should contain only en-US alphanumeric characters",
      options: "en-US"
    },
    trim: {
      options: [" "]
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
        returnScore: false
      }
    }
  },
  confirmPassword: {
    in: "body",
    custom: {
      errorMessage: "Passwords don't match",
      options: checkConfirmationPassword
    } 
  }
});
