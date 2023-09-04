const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, " Please Enter a Username"] },
    email: { type: String, required: [true, "Please enter email"] },
    password: { type: String, required: [true, "Please Enter a username"] },
    privateAccount: { type: Boolean, default: false },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    profilePicUrl: { type: String },
    bio: { type: String },
    savedPost: [],
    archievedPost: [],
  },
  { timestamps: true }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  //skip other fields , only pass is modivied before save
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
