const Post = require("../models/post");

exports.getIndex = (req, res, next) => {
  const oldestPost = new Date();
  oldestPost.setDate(oldestPost.getDate() - 30);

  Post.find({
    createdAt: {
      $gte: oldestPost,
    },
  })
    .sort({ votes: -1 })
    .limit(20)
    .then((popularPosts) => {
      res.render("index", {
        title: "Beautiful Internet",
        popularPosts,
      });
    });
};
