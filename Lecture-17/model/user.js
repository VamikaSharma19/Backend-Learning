const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserData = new Schema ({
    email : String,
    username : String,
    password : String,
    // User to Blogs (One to Many Relation)
    blogs : [{
        type : mongoose.Types.ObjectId,
        ref : "Blog"
    }]
});

module.exports = mongoose.model('Users', UserData);