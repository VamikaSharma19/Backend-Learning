// The file with the smaller size was read first because fs.readFile works asynchronously.

const fs = require("fs");

/* The data here was read in the form of a Buffer (which helps in working with binary data).
Buffer is being used to temporarily hold the data while it's being read. */
fs.readFile("../demo.txt", function (err, data) {
    if (err) return console.log(err);
    console.log(data); 
})

// If we want our data to be displayed on the console in a human-readable format, then we use 'utf-8' encoding.
fs.readFile("../demo1.txt", "utf-8", function (err, data) {
    if (err) return console.log(err);
    console.log(data);
})