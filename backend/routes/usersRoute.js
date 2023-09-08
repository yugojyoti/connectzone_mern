const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logOutUser,
  getAllUsers,
  followUser,
  unFollowUser,
  getUser,
  editProfile,
} = require("../controllers/userControllers");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logOutUser);
router.route("/getallusers").get(getAllUsers);
router.route("/followuser").post(followUser);
router.route("/unfollowuser").post(unFollowUser);
router.route("/getuser/:userId").post(getUser);
router.route("/editProfile").post(editProfile);

module.exports = router;
