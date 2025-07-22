// Write data in file using fs module, but data should be taken from user on terminal. 
const fs = require("fs");

// Initialize empty string
let string = "";

// Loop through command-line arguments (process.argv is an array in which input from terminals is stored)
for (let i = 2; i < process.argv.length; i++) {
    string += process.argv[i] + " ";
}

// Write string to file (node part-1 My name is Vamika)
fs.writeFile("part-1.txt", string.trim(), function(err) {
    if (err) return console.log(err);
    console.log("File created");
});