/* Write combine data of demo.txt & demo1.txt into a single file named result.txt.
Here, we have used a nested structure of functions because fs.readFile and fs.writeFile are asynchronous in nature.
Without nesting, the code would execute asynchronously, attempting to write the data before the file is actually read. 
As a result, result.txt would contain null or undefined content. */

const fs = require("fs");

fs.readFile("../demo.txt", "utf-8", function(err, data1) {
    if (err) return console.log(err);
    console.log(data1);

fs.readFile("../demo1.txt", "utf-8", function(err, data2) {
    if (err) return console.log(err);
    console.log(data2);

/* By using separate variable to store combined result.
const result = data1 + data2;
fs.writeFile("../result.txt", result, function(err, data) {
    if (err) return console.log(err);
    console.log("Successfully created result.txt");
}) */

// To write data on separate lines without creating a separate variable to store the combined result.
fs.writeFile("../result.txt", data1 + "\n" + data2, function(err, data) {
    if (err) return console.log(err);
    console.log("Successfully created result.txt");
})
})
})