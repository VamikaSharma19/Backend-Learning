const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json()); 

app.post('/hello', (req, res) => {
    let {name, age, email} = req.body;
    let update = `${name}, ${age}, ${email}\n`;
    res.send(name + age + email);
    console.log(name, age, email);

fs.readFile("hello.txt", "utf-8", function(err, data) {
    if(err) return console.log(err);
    console.log("File updated");
    let updated = data + update;

fs.writeFile("hello.txt", updated, function(err) {
    if(err) return console.log(err);
    console.log("Content written");
})
})
})

app.listen(3012, function() {
    console.log("Server started")
})