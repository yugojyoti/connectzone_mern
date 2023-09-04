const mongoose = require("mongoose");
const connectDb = async (url) => {
  try {
    const conn = await mongoose.connect(url);
    console.log(
      ` Mongoose database successfully connected to ${conn.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDb };
