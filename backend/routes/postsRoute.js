const express = require("express");
const router = express.Router();
const {
  addPost,
  getAllPost,
  likePost,
  addComment,
} = require("../controllers/postControllers");

router.route("/addpost").post(addPost);
router.route("/getallposts").get(getAllPost);
router.route("/like").post(likePost);
router.route("/addcomment").post(addComment);

module.exports = router;
