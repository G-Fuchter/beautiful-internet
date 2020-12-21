var express = require("express");

const postsController = require("../controllers/posts");

var router = express.Router();

router.get("/add-post", postsController.getAddPost);

router.post("/add-post", postsController.postAddPost);

module.exports = router;
