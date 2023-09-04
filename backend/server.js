// import module
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

//path module import
const { connectDb } = require("./config/db");
const userRoute = require("./routes/usersRoute");

// middleware
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes

app.get("/", (req, res) => {
  res.send("hello there");
});
app.use("/api/users", userRoute);

//database connction

connectDb("mongodb://0.0.0.0:27017/connectzone");
//port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(` Listening on port http://localhost:${port}`);
});
