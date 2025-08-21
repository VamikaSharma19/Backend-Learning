const Blogs = require("../model/blog");
const Users = require("../model/user");

module.exports.postaddBlog = async(req, res) => {
  let { title, body, userId } = req.body;
  let userExist = await Users.findById(userId);
  if (userExist) {
    let newBlog = new Blogs({
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
};

module.exports.getreadBlog = async(req, res) => {
  let allBlogs = await Blogs.find();
  res.json ({
    success : true,
    data : allBlogs,
  });
};

module.exports.getOneBlog = async(req, res) => {
  let { id } = req.params;
  let blog = await Blogs.findById(id);
  res.json ({
    success : true,
    data : blog
  });
}

module.exports.putUpdateBlog = async(req, res) => {
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
}

module.exports.deleteOneBlog = async(req, res) => {
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
}