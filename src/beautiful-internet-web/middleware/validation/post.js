const { checkSchema } = require("express-validator");

const prependHttpProtocol = (value, { req }) => {
  let sanitizedValue = req.body.url;

  protocolRegex = /^(https:\/\/|http:\/\/)/;
  if (!protocolRegex.test(req.body.url)) {
    sanitizedValue = `https://${req.body.url}`;
  }
  return sanitizedValue;
}

exports.newPost = checkSchema({
  title: {
    in: "body",
    isLength: {
      errorMessage: "Website's name should be between 5 and 35 characters",
      options: {
        min: 5,
        max: 35,
      },
    },
    trim: {
      options: [" "],
    },
  },
  url: {
    in: "body",
    isURL: {
      errorMessage: "The website's url is in a wrong format",
      options: {
        require_protocol: false,
      },
    },
    customSanitizer: {
      options: prependHttpProtocol,
    },
    trim: {
      options: [" "],
    },
  },
  imageUrl: {
    in: "body",
    isURL: {
      errorMessage: "The image url has the wrong format"
    },
    trim: {
      options: [" "],
    },
  },
  description: {
    in: "body",
    isLength: {
      errorMessage: "Website's description should be between 0 and 256 characters",
      options: {
        min: 0,
        max: 256,
      },
    },
  }
});
