const { validationResult } = require("express-validator");

const Post = require("../models/post");

exports.getAddPost = (req, res, next) => {
  res.render("post/add-post", { title: "Add an App" });
};

exports.postAddPost = (req, res, next) => {
  const { title, url, imageUrl, description } = req.body;
  const errors = validationResult(req);
  const post = new Post({
    title,
    url,
    imageUrl,
    description,
    votes: 0,
    creatorId: "5fdcd337608ba20869b4205e", // TODO: Replace this with user's id
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
