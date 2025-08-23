// We executed all requests in this folder using Thunder Client
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./model/users");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

console.log(User);

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
    return res.json ({
      success : true,
      message : "Login success"
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

mongoose.connect("mongodb://127.0.0.1:27017/backend-lecture-21")
.then(() => {
  console.log("Connected to database");
})
.catch((err) => {
  console.log(err.message);
})

app.listen(3009, () => {
  console.log("Server started");
})