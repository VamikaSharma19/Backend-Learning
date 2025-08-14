// We executed all the requests in this folder using Thunder Client.
const express = require("express");
const mongoose = require("mongoose");
const Blogs = require("./model/blog")
const Users = require("./model/user")

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Adding Blogs
app.post("/blogs", async(req, res) => {
    let {title, body} = req.body;
    let newBlog = new Blogs ({
      title : title,
      body : body,
      date : Date.now()
    })
    console.log(title, body);
// We added await before newBlog.save() because saving to a database is an I/O operation and is asynchronous in nature.
    await newBlog.save();
    res.json ({
      success : true,
      data : newBlog,
      message : "Blog added successfully"
    })
})

// Getting all blogs
app.get("/blogs", async(req, res) => {
  let allBlogs = await Blogs.find();
  res.json ({
    success : true,
    data : allBlogs,
  })
})

// Getting single blog 
app.get("/blogs/:id", async(req, res) => {
  let {id} = req.params;
  let blog = await Blogs.findOne({_id:id});
  res.json ({
    success : true,
    data : blog
  })
})

// Adding users
app.post("/users", async(req, res) => {
    let {email, username, password} = req.body;
    let newUser = new Users({
      email : email,
      username : username,
      password : password
    })
    console.log(email, username, password);
    await newUser.save();
    res.json ({
      success : true,
      data : newUser,
      message : "User added successfully"
    })
})

// Getting all users
app.get("/users", async(req, res) => {
  let allUsers = await Users.find();
  res.json ({
    success : true,
    data : allUsers,
  })
})

// Getting single user
app.get("/users/:id", async(req, res) => {
  let {id} = req.params;
  let user = await Users.findOne({_id:id});
  res.json ({
    success : true,
    data : user
  })
})

// Connecting to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/backend-lecture-16')
  .then(() => console.log('Connected!'));

app.listen(3002, () => {
    console.log("Server started");
})