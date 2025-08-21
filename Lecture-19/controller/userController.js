const Users = require("../model/user");

module.exports.postaddUser = async(req, res) => {
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
};

module.exports.getUser = async(req, res) => {
  let allUsers = await Users.find();
  res.json ({
    success : true,
    data : allUsers,
  });
};

module.exports.getOneUser = async(req, res) => {
  let { id } = req.params;
  let userExist = await Users.findById(id).populate("blogs");
  if (userExist) {
    res.json ({
      success : true,
      data : userExist
    });
  } else {
    res.json ({ success : false, message : "User not found" });
  }
};