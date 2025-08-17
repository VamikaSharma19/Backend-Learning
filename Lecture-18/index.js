// We executed all requests in this folder using Thunder Client.
const express = require("express");
const mongoose = require("mongoose");
const Blogs = require("./model/blog")
const Users = require("./model/user");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/blogs", async(req, res) => {
    let {title, body, userId} = req.body;
    let userExist = await Users.findById(userId);
    if (userExist) {
    console.log(title, body, userId);
    let newBlog = new Blogs({
      title : title,
      body : body,
      date : Date.now(),
      userId : userId
    })
    await newBlog.save();
    userExist.blogs.push(newBlog._id);
    await userExist.save();
    res.json ({
      success : true,
      data : newBlog,
      message : "Blog added successfully"
    })
  }
})

app.get("/blogs", async(req, res) => {
  let allBlogs = await Blogs.find();
  res.json ({
    success : true,
    data : allBlogs,
  })
})

app.get("/blogs/:id", async(req, res) => {
  let {id} = req.params;
  let blog = await Blogs.findOne({_id:id});
  res.json ({
    success : true,
    data : blog
  })
})

app.delete("/blogs/:blogId", async(req, res) => {
  let {blogId} = req.params;
  let {userId} = req.body;
  let blogExist = await Blogs.findById(blogId);
  if(!blogExist) return res.json ({
    success : false,
    message : "Blog doesn't exists"
  })
  if(blogExist.userId != userId) return res.json ({
    success : false,
    message : "You are not allowed to delete this blog"
  })
  await Blogs.findByIdAndDelete(blogId);
  let userExist = await Users.findById(userId);
  let blog = userExist.blogs.filter((id) => id!=blogId);
  userExist.blogs = blog;
  await userExist.save();
  res.json ({
    success : true,
    message : "Blog deleted successfully",
    data : userExist
  })
})

app.put("/blogs/:blogId", async(req, res) => {
  let {blogId} = req.params;
  let {title, body, userId} = req.body;
  let blogExist = await Blogs.findById(blogId);
  if (!blogExist) {
    return res.json ({
      success : false,
      message : "Blog doesn't exist"
    });
  }
  if (blogExist.userId != userId) {
    return res.json ({
      success : false,
      message : "You are not allowed to update this blog"
    });
  }
  blogExist.title = title || blogExist.title;
  blogExist.body = body || blogExist.body;
  blogExist.date = Date.now();
  await blogExist.save();
  res.json ({
    success : true,
    message : "Blog updated successfully",
    data : blogExist
  });
})

app.post("/users", async(req, res) => {
    let {email, username, password} = req.body;
    let newUser = new Users({
      email : email,
      username : username,
      password : password
    })
    await newUser.save();
    res.json ({
      success : true,
      data : newUser,
      message : "User added successfully"
    })
})

app.get("/users", async(req, res) => {
  let allUsers = await Users.find();
  res.json ({
    success : true,
    data : allUsers,
  })
})

app.get("/users/:id", async(req, res) => {
  let {id} = req.params;
  let userExist = await Users.findOne({_id:id}).populate("blogs");
  if(userExist) {
  res.json ({
    success : true,
    data : userExist
  }) }
})

mongoose.connect('mongodb://127.0.0.1:27017/backend-lecture-18')
  .then(() => console.log('Connected!'));

app.listen(3005, () => {
    console.log("Server started");
})