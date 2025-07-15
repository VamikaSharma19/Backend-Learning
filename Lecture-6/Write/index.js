/* The text "Heyyy" was printed first because fs.writeFile works asynchronously.
While the file writing process was still in progress, the "Heyyy" statement executed immediately without waiting. */

const fs = require("fs");

fs.writeFile("../demo.txt", "Hello Everyone", function(err, data) {
    if (err) return console.log(err);
    console.log("Successfully created demo.txt");
})

fs.writeFile("../demo1.txt", "My name is Vamika", function(err, data) {
    if (err) return console.log(err);
    console.log("Successfully created demo1.txt");
})

console.log("Heyyy");