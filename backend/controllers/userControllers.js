const User = require("../models/userModel");
const asyncHandler = require("../middlewares/asyncHandler");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(500)
      .json({ message: " Please enter email, username, password" });
  }
  const user = await User.findOne({ username: username });

  if (user) {
    generateToken(user._id, res);
    return res
      .status(500)
      .json({ message: " Username already exist , enter a new one" });
  }
  await User.create({ username, email, password });
  const newUser = await User.findOne(
    { username },
    {
      password: 0,
    }
  );
  res
    .status(200)
    .json({ user: newUser, message: " Account created sucessfully" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (user && (await user.matchPassword(password))) {
    generateToken(user._id, res);
    const sendUser = await User.findOne(
      { username: username },
      {
        password: 0,
      }
    );

    res.status(200).json({ user: sendUser, message: " User Logging in .." });
  } else {
    res.status(404).json({ message: "Invalid Username or Password" });
  }
});

const logOutUser = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(1) });
  res.status(200).json({ message: " Logged out sucessfully " });
};

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, { password: 0 });
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: " User not found" });
  }
});
module.exports = {
  registerUser,
  loginUser,
  logOutUser,
  getAllUsers,
};
