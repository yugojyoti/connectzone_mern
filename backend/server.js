// import module
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

//path module import
const { connectDb } = require("./config/db");
const userRoute = require("./routes/usersRoute");
const postsRoute = require("./routes/postsRoute");

// middleware
app.use(cors({ credentials: true, origin: true }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(cookieParser());

//database connction
connectDb(process.env.MONGO_URI);

//routes
app.use("/api/users", userRoute);
app.use("/api/posts", postsRoute);

const __thispath = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__thispath, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__thispath, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

//port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(` Listening on port http://localhost:${port}`);
});
