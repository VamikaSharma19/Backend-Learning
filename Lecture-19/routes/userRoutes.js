const express = require("express");
const router = express.Router();
// const Users = require("../model/user");
const {postaddUser, getUser, getOneUser} = require("../controller/userController");

// Create User
router.post("/", postaddUser);
/* router.post("/", async(req, res) => {
  try {
    let { email, username, password } = req.body;
    let newUser = new Users({ email, username, password });
    await newUser.save();
    res.json ({
      success : true,
      data : newUser,
      message : "User added successfully"
    });
  } catch (err) {
    res.status(500).json ({ success : false, message : err.message });
  }
});  */

// Get All Users
router.get("/", getUser);
/* router.get("/", async(req, res) => {
  let allUsers = await Users.find();
  res.json ({
    success : true,
    data : allUsers,
  });
});  */

// Get User by Id
router.get("/:id", getOneUser);
/* router.get("/:id", async(req, res) => {
  let { id } = req.params;
  let userExist = await Users.findById(id).populate("blogs");
  if (userExist) {
    res.json ({
      success : true,
      data : userExist
    });
  } else {
    res.json({ success : false, message : "User not found" });
  }
});  */

module.exports = router;