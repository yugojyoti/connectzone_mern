const express = require("express");
const router = express.Router();
const {
  addPost,
  getAllPost,
  likePost,
  addComment,
  deletePost,
  editPost,
  getPost,
} = require("../controllers/postControllers");

router.route("/addpost").post(addPost);
router.route("/getallposts").get(getAllPost);
router.route("/like").post(likePost);
router.route("/addcomment").post(addComment);
router.route("/deletepost").delete(deletePost);
router.route("/editpost").patch(editPost);
router.route("/getpost/:postId").get(getPost);

module.exports = router;
