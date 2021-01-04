const { validationResult } = require("express-validator");

const Post = require("../models/post");

exports.getAddPost = (req, res, next) => {
  res.render("post/add-post", {
    title: "Add an App",
    oldInput: null,
    errorMessages: [],
  });
};

exports.postAddPost = (req, res, next) => {
  const { title, url, imageUrl, description } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let oldInput = { title, url, imageUrl, description };
    let errorMessages = errors.array().map((x) => x.msg);
    return res.status(422).render("post/add-post", {
      title: "Add an App",
      oldInput,
      errorMessages,
    });
  }
  const post = new Post({
    title,
    url,
    imageUrl,
    description,
    votes: 0,
    creatorId: req.user._id,
  });
  post
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      next(new Error(err));
    });
};

// exports.postUpvotePost TODO
