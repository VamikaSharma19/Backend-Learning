/* We have to combine array of users & people into one array & write it in a file named result.txt.
By using fs module - 
const fs = require("fs");

fs.readFile("../users.txt", "utf-8", function(err, data1) {
    if(err) return console.log(err);
    let users = JSON.parse(data1);
    console.log("Read users");

fs.readFile("../people.txt", "utf-8", function(err, data2) {
    if(err) return console.log(err);
    let people = JSON.parse(data2);
    console.log("Read people");

// let combine = users.concat(people); // By using concatenation

let combine = [...users, ...people] // By using spread operator

fs.writeFile("../result.txt", JSON.stringify(combine), function(err, data) {
    if(err) return console.log(err);
    console.log("result.txt created successfully");
})
})
}) */

// By using our custom module -
const {read} = require("../IOoperation/util");
const {write} = require("../IOoperation/util");

read("../users.txt")
  .then(users => {
    console.log("Users read");

    return read("../people.txt")
      .then(people => {
        console.log("People read");

        let combined = [...users, ...people];

        return write("../result.txt", combined);
      });
  })

  .then(msg => {
    console.log("result.txt created successfully");
  })
  .catch(err => {
    console.error(err);
  });