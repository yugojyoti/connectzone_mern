const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logOutUser,
  getAllUsers,
} = require("../controllers/userControllers");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logOutUser);
router.route("/getallusers").get(getAllUsers);

module.exports = router;
