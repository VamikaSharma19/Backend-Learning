// ismai users.txt or people.txt ka data read karva dusri file mai add karvana hai, ek hi object mai
// ye sab properly likhna hai ki kahan se kab string mai convert or kab object mai
// ab ye callback hell ban gya hai chota sa toh isko hum promise banayenge ab
// isko bhi ab hamara wale module ki help se hi run karvana hai

const fs = require("fs");

fs.readFile("../users.txt", "utf-8", function(err, data1) {
    if(err) return console.log(err);
    let users = JSON.parse(data1);
    console.log("Read users");

fs.readFile("../people.txt", "utf-8", function(err, data2) {
    if(err) return console.log(err);
    let people = JSON.parse(data2);
    console.log("Read people");

// let combine = users.concat(people);
let combine = [...users, ...people]

fs.writeFile("../result.txt", JSON.stringify(combine), function(err, data) {
    if(err) return console.log(err);
    console.log("result.txt created successfully");
})
})
})