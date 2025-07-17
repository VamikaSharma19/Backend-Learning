/* This file defines a reusable module for file operations using Promises.
Instead of repeating large blocks of file handling code multiple times,
We have created two utility functions — "read" and "write" — that can be imported and used wherever needed in a shorter way. */

/* The "read(filepath)" function reads data from the specified file, 
and returns a Promise that resolves with the parsed JSON content. */
const fs = require("fs");
function read(filepath) {
    return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf-8", function(err, data) {
    if(err) return reject(err);
    let users = JSON.parse(data);
    resolve(users);
});
    });
}

/* The "write(filepath, data)" function writes the provided data (converted to JSON)
to the specified file and returns a Promise that resolves upon successful completion. */
function write(filepath, data) {
    return new Promise((resolve, reject) => {
    fs.writeFile(filepath, JSON.stringify(data), function(err) {
    if (err) return reject(err);
    resolve("Data written successfully");
});
    });
}

module.exports.read = read;
module.exports.write = write;