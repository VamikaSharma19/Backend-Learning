// We executed all requests in this folder using Thunder Client
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./model/users");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

console.log(User);

function isLogin(req, res, next) {
  if(!req.headers.authorization) {
    return res.json ({
      success : false,
      message : "No authorization key provided"
    })
  }
  let token = req.headers.authorization;
  console.log(token);
  if(!token) {
    return res.json ({
      success : false,
      message : "Please login"
    })
  }
  let decode = jwt.verify(token, "SecretKey");
  console.log(decode);
  if(!decode) {
    return res.json ({
      success : false,
      message : "Invalid token"
    })
  }
  req.user = decode.user;
  next();
}

app.get("/home", isLogin, (req, res) => {
  console.log("User ---> " + req.user.name)
  let username = req.user.name;
  res.json ({
    success : true,
    message : "Welcome " + username 
  })
})

// End point for user sign up - Adding new user to database
app.post("/api/users/signup", async(req, res) => {
  try {
  // To check whether user already exists or not 
  let {name, email, password} = req.body;
  let userExist = await User.findOne({email:email})
  if(userExist) {
    return res.json ({
      success : false,
      message : "User already exist with this email please login"
    })
  }
  let newUser = new User ({
    name : name,
    email : email,
    password : password
  })
  await newUser.save()
  res.json ({
    success : true,
    message : "User registered successfully, please login to continue"
  })
}
catch(error) {
    console.log(error.message);
    res.json ({
      error: {
        message : error.message
      }
    })
  }
})

// End point for user login
app.post("/api/auth/login", async(req, res) => {
  try {
  const {email,password} = req.body;
  let userExist = await User.findOne({email:email});
  if(!userExist) {
    return res.json ({
      success : false,
      message : "User does not exist please signup"
    })
  }
  if(userExist.password != password) {
    return res.json ({
      success : false,
      message : "Invalid password, please try again"
    })
  }
  if(userExist.password == password) {
    let token = jwt.sign({"user" : userExist}, "SecretKey");
    return res.json ({
      success : true,
      message : "Login success",
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

mongoose.connect("mongodb://127.0.0.1:27017/backend-lecture-22")
.then(() => {
  console.log("Connected to database");
})
.catch((err) => {
  console.log(err.message);
})

app.listen(3010, () => {
  console.log("Server started");
})