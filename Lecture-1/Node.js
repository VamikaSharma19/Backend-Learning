const fs = require("fs");
// console.log (fs); (For showing fs commands)
console.log ("Helloooo");
function add(a,b) {
    return a+b;
}
function sub(a,b) {
    return a-b;
}
function multiply(a,b) {
    return a*b;
}
fs.readFile("Demo.txt", "utf-8", (Data) => {
    console.log (Data);
})
add(2,3);
sub(5,6);
multiply(3,2);
console.log("Exit");