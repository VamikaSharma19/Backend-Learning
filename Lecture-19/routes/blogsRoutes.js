const express = require("express");
const router = express.Router();
/* const Blogs = require("../model/blog");
const Users = require("../model/user");  */
const {postaddBlog, getreadBlog, getOneBlog, deleteOneBlog, putUpdateBlog} = require("../controller/blogController");

// Create Blog
router.post("/", postaddBlog);
/* router.post("/", async(req, res) => {
  let { title, body, userId } = req.body;
  let userExist = await Users.findById(userId);
  if (userExist) {
    let newBlog = new Blogs ({
      title,
      body,
      date : Date.now(),
      userId
    });
    await newBlog.save();
    userExist.blogs.push(newBlog._id);
    await userExist.save();
    return res.json ({
      success : true,
      data : newBlog,
      message : "Blog added successfully"
    });
  }
  res.json ({ success : false, message : "User not found" });
});  */

// Get All Blogs
router.get("/", getreadBlog);
/* router.get("/", async(req, res) => {
  let allBlogs = await Blogs.find();
  res.json  ({
    success : true,
    data : allBlogs,
  });
});  */

// Get Blog by Id
router.get("/:id", getOneBlog);
/* router.get("/:id", async(req, res) => {
  let { id } = req.params;
  let blog = await Blogs.findById(id);
  res.json ({
    success : true,
    data : blog
  });
});  */

// Update Blog
router.put("/:id", putUpdateBlog);
/* router.put("/:id", async(req, res) => {
  let { id } = req.params;
  let { title, body, userId } = req.body;
  let blogExist = await Blogs.findById(id);
  if (!blogExist) return res.json ({ success : false, message : "Blog doesn't exist" });
  if (blogExist.userId != userId) return res.json ({ success : false, message : "You're not allowed to update this blog" });
  blogExist.title = title;
  blogExist.body = body;
  blogExist.date = Date.now();
  await blogExist.save();
  res.json ({
    success : true,
    data : blogExist,
    message : "Blog updated successfully"
  });
});  */

// Delete Blog
router.delete("/:blogId", deleteOneBlog);
/* router.delete("/:blogId", async(req, res) => {
  let { blogId } = req.params;
  let { userId } = req.body;
  let blogExist = await Blogs.findById(blogId);
  if (!blogExist) return res.json ({ success : false, message : "Blog doesn't exist" });
  if (blogExist.userId != userId) return res.json ({ success : false, message : "You're not allowed to delete this blog" });
  await Blogs.findByIdAndDelete(blogId);
  let userExist = await Users.findById(userId);
  userExist.blogs = userExist.blogs.filter((id) => id.toString() !== blogId);
  await userExist.save();
  res.json ({
    success : true,
    message : "Blog deleted successfully",
    data : userExist
  });
});  */

module.exports = router;