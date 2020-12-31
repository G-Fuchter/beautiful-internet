var express = require("express");

const postsController = require("../controllers/posts");
const isLogged = require("../middleware/is-logged");
const postValidator = require("../middleware/validation/post");

var router = express.Router();

router.get("/add-post", isLogged, postsController.getAddPost);

router.post("/add-post", isLogged, postValidator.newPost, postsController.postAddPost);

module.exports = router;
