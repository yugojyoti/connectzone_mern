const Post = require("../models/postModel");
const { cloudinary } = require("../cloudinary");
const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/userModel");

const addPost = asyncHandler(async (req, res) => {
  const { description, image, likes, comments, user } = req.body;
  const uploadResponse = await cloudinary.v2.uploader.upload(image, {
    folder: "connectzone",
    use_filename: true,
  });
  if (uploadResponse) {
    const imageUrl = uploadResponse.url;
    const newPost = await Post.create({
      description,
      image: imageUrl,
      likes,
      comments,
      user,
    });
    if (newPost) {
      res.status(200).json({ message: "Post created Successfully" });
    } else {
      res.status(404).json({ message: "Failed to create post" });
    }
  } else {
    res.status(404).json({ message: "Failed to upload" });
  }
});

const getAllPost = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate("user").sort({ createdAt: -1 });
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(404).json({ message: " No Post found" });
  }
});
const likePost = asyncHandler(async (req, res) => {
  const { userId, postId } = req.body;
  let post = await Post.findById(postId);

  const date = new Date();
  if (post) {
    const liked = post.likes.find((like) => {
      return like.user._id.toString() === userId;
    });

    if (liked) {
      const likes = post.likes.filter(
        (like) => like.user.toString() !== userId
      );
      post.likes = likes;
      const updatedPost = await Post.updateOne({ _id: postId }, post);
      console.log(updatedPost);
      res.status(200).json({ message: "post unliked successfully" });
    } else {
      post.likes.push({ user: userId, date: date });
      const updatedPost = await Post.updateOne({ _id: postId }, post);
      console.log(updatedPost);

      res.status(200).json({ message: "post liked successfully" });
    }
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

const addComment = asyncHandler(async (req, res) => {
  const { comment, postId, userId } = req.body;
  let post = await Post.findById(postId);

  if (post) {
    const date = new Date();
    post.comments.push({
      user: userId,

      date: date,
      comment: comment,
    });
    const updatePost = await Post.updateOne({ _id: postId }, post, {
      new: true,
    });

    res.status(200).json({ message: "comment added successfully" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

module.exports = { addPost, getAllPost, likePost, addComment };
