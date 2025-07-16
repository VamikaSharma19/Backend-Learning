let users = [
    {
        name : "Vanshika",
        age : 19,
        address : "Ambala Cantt"
    },
    {
        name : "Ragni",
        age : 20,
        address : "Ambala"
    }
]

let people = [
    {
        name : "Vamika",
        age : 19,
        course : "cse"
    }, 
    {
        name : "Neeraj",
        age : 50,
        course : "law"
    }
]

const fs = require("fs");

fs.writeFile("../users.txt", JSON.stringify(users), function(err) {
    if(err) return console.log(err);
    console.log("Users written");
})

fs.writeFile("../people.txt", JSON.stringify(people), function(err){
    if(err) return console.log(err);
    console.log("People written");
})