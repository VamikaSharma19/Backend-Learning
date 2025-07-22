/* Make a terminal-based To-Do application. In which application should allow users to:
Enter a title and description for a to-do task via the terminal.
Each new task entered is added to a file (part-2.txt), ensuring that:
New tasks are appended to the existing list.
The previous content remains intact. */

const fs = require("fs");
let title = process.argv[2];
let description = process.argv[3];

// (node part-2 Backend "Complete given assignments"), (node part-2 CC "Complete first practical")
let obj = {title, description};
fs.readFile("part-2.txt", "utf-8", function(err, data) { 
    let arr = [];
    if(!err&&data!= "") {
        arr = JSON.parse(data);
    }
    arr.push(obj);
    fs.writeFile("part-2.txt", JSON.stringify(arr, null, 6), function(err) {
        if(err) return console.log(err);
        console.log("To-Do task written");
    })
})