const file2 = require("./File2");
console.log (file2);

function sum(a,b) {
    return a+b;
}
function sub(a,b) {
    return a-b;
}
module.exports = {
    sum, sub
}