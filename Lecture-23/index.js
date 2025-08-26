// We executed all requests in this folder using Thunder Client.
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Blogs = require("./model/blog")
const Users = require("./model/user");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

function isLogin(req, res, next) {
  if(!req.headers.authorization) {
    return res.json ({
      success : false,
      message : "No authorization key provided"
    })
  }
  let token = req.headers.authorization;
  if(!token) {
    return res.json ({
      success : false,
      message : "No token provided, please Login"
    })
  }
  let decode = jwt.verify(token, "MySecretKey1");
  if(!decode) {
    return res.json ({
      success : false,
      message : "Token is not valid"
    })
  }
  req.userId = decode.userId;
  next();
}

app.post("/blogs", isLogin, async(req, res) => {
    let {title, body} = req.body;
    let userId = req.userId;
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

app.get("/blogs", isLogin, async(req, res) => {
  let allBlogs = await Blogs.find();
  res.json ({
    success : true,
    data : allBlogs,
  })
})

app.get("/blogs/:id", isLogin, async(req, res) => {
  let {id} = req.params;
  let blog = await Blogs.findOne({_id:id});
  res.json ({
    success : true,
    data : blog
  })
})

app.delete("/blogs/:blogId", isLogin, async(req, res) => {
  let {blogId} = req.params;
  let userId = req.userId;
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

app.put("/blogs/:blogId", isLogin, async(req, res) => {
  let {blogId} = req.params;
  let {title, body} = req.body;
  let userId = req.userId;
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

app.post("/users/login", async(req, res) => {
  try {
    const {email, username, password} = req.body;
    let userExist = await Users.findOne({email:email});
    if(!userExist) {
      res.json ({
        success : false,
        message : "User doesn't exists, please sign up"
      })
    }
    if(userExist.password != password) {
      res.json ({
        success : false,
        message : "Password is invalid, please try again"
      })
    }
    let token = jwt.sign({"userId" : userExist._id}, "MySecretKey1");
    if(userExist.password == password) {
      res.json ({
        success : true,
        message : "Login successfull",
        token : token
      })
    }
  }
catch(error) {
  console.log(error);
  res.json ({
    error: {
      message : error.message
    }
  })
}
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

mongoose.connect('mongodb://127.0.0.1:27017/backend-lecture-23')
  .then(() => console.log('Connected!'));

app.listen(3011, () => {
    console.log("Server started");
})