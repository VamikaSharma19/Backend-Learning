const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

/* app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + "/about.html");
}) */

app.post('/users', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let newUser = {username, password};

    fs.readFile("users.json", "utf-8", (err, data) => {
        let users = [];
        if(!err && data!= "") {
                users = JSON.parse(data);
        }
        users.push(newUser);
    fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
        if(err) return console.log(err);
            console.log("User saved successfully");
            res.json(newUser);
})
})
})

app.listen(3012, function() {
    console.log("Server started")
})