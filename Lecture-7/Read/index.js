/* Reading files by using fs module -
const fs = require("fs");

fs.readFile("../users.txt", "utf-8", function(err, data) {
    if(err) return console.log(err);
    // This will print "[" because we have converted our array into string by JSON.stringify, so it is printing the first character.
    console.log(data[0]); 
    let users = JSON.parse(data);
    // Now it will print first array, as we have reconverted our string into array.
    console.log(users[0]);
    console.log(users[0].name);
}) 
    
fs.readFile("../people.txt", "utf-8", function(err, data) {
    if(err) return console.log(err);
    let people = JSON.parse(data);
    console.log(people[0]);
}) */

// Reading files by using our custom module -
const {read} = require("../IOoperation/util");

async function readFile(filepath) {
    let data = await read(filepath);
    console.log(data);
}

readFile("../users.txt");
readFile("../people.txt");