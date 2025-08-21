// We executed all requests in this folder using Thunder Client. 
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoutes");
const blogRoute = require("./routes/blogsRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

mongoose.connect("mongodb://127.0.0.1:27017/backend-lecture-19")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(3007, () => {
  console.log("Server Started");
})