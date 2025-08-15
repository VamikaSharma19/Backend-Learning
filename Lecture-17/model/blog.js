const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPost = new Schema ({
  title : String,
  body : String,
  date : Date,
  // Blogs to User (Many to One Relation)
  userId : {
    type : mongoose.Types.ObjectId,
    ref : "Users"
  }
});

module.exports = mongoose.model('Blog', BlogPost);