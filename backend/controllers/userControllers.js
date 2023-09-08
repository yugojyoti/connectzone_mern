const User = require("../models/userModel");
const asyncHandler = require("../middlewares/asyncHandler");
const generateToken = require("../utils/generateToken");
const { cloudinary } = require("../cloudinary");

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

    res
      .status(200)
      .json({ user: sendUser, message: " Logged In Successfully" });
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
const followUser = asyncHandler(async (req, res) => {
  const { currentUserId, recieverUserId } = req.body;
  let currentUser = await User.findById(currentUserId);
  currentUser.following.push(recieverUserId);
  await User.findByIdAndUpdate(currentUserId, currentUser);

  let recieverUser = await User.findById(recieverUserId);
  recieverUser.followers.push(currentUserId);
  await User.findByIdAndUpdate(recieverUserId, recieverUser);
  res.status(200).json({ message: "User Followed Successfully" });
});

const unFollowUser = asyncHandler(async (req, res) => {
  const { currentUserId, recieverUserId } = req.body;
  let currentUser = await User.findById(currentUserId);

  const currentFollowing = currentUser.following.filter(
    (id) => id.toString() !== recieverUserId
  );
  currentUser.following = currentFollowing;
  const currentUser2 = await User.findByIdAndUpdate(
    currentUserId,
    currentUser,
    { new: true }
  );

  let recieverUser = await User.findById(recieverUserId);
  const recieverFollower = recieverUser.followers.filter(
    (id) => id.toString() !== currentUserId
  );
  recieverUser.followers = recieverFollower;
  await User.findByIdAndUpdate(recieverUserId, recieverUser);
  res.status(200).json({ message: " User unfollowed successfully" });
});
const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId, { password: 0 });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: " user not found" });
  }
});

const editProfile = asyncHandler(async (req, res) => {
  const { userId, username, email, bio, isPrivate, image } = req.body;
  let user = await User.findById(userId);
  if (user) {
    const uploadResponse = await cloudinary.v2.uploader.upload(image, {
      folder: "connectzone/profilepics",
      use_filename: true,
    });
    if (uploadResponse) {
      const imageUrl = uploadResponse.url;
      (user.username = username),
        (user.email = email),
        (user.bio = bio),
        (user.profilePicUrl = imageUrl);
      user.privateAccount = isPrivate;
      await User.findByIdAndUpdate(userId, user);
      res.status(200).json({ message: " Profile Successfully Edited" });
    } else {
      res.status(404).json({ message: "Cant upload immage" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = {
  registerUser,
  loginUser,
  logOutUser,
  getAllUsers,
  followUser,
  unFollowUser,
  getUser,
  editProfile,
};
