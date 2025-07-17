let users = [
    {
        name : "Ragni",
        age : 20,
        address : "Ambala"
    },
    {
        name : "Vanshika",
        age : 19,
        address : "Ambala Cantt"
    }
]

let people = [
    {
        name : "Neeraj",
        age : 50,
        course : "law"
    }, 
    {
        name : "Vamika",
        age : 19,
        course : "cse"
    }
]

/* Writing by using fs module -
const fs = require("fs");

fs.writeFile("../users.txt", JSON.stringify(users), function(err) {
    if(err) return console.log(err);
    console.log("Users written");
})

fs.writeFile("../people.txt", JSON.stringify(people), function(err) {
    if(err) return console.log(err);
    console.log("People written");
}) */

// Writing by using our custom module -
const {write} = require("../IOoperation/util");

write("../users.txt", users)
    .then(msg => console.log("Users written:", msg))
    .catch(err => console.error(err));

write("../people.txt", people)
    .then(msg => console.log("People written:", msg))
    .catch(err => console.error(err));