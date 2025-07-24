const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // res.send("Hello World");
    // res.send("<h1>OK</h1>")
    res.sendFile(__dirname + "/index.html");  // (We have to give absolute path of the file here)
    // res.json({
    //     name : "Vamika",
    //     age : 19
    // });
    // res.end("hi");
})

/* Query: It will print object on console. 
URL Example: http://localhost:3012/watch?v=vsiad&n=hsdda */
app.get("/watch", (req,res) => {
    // console.log(req.query);
    let videoId = req.query.v;
    let nId = req.query.n;
    res.send("Id got it" + " " + videoId + nId);
})

/* Params: This will also print object on console.
URL Example: http://localhost:3012/watch/1234
URL Example: http://localhost:3012/watch/1234/video/234
app.get("/watch/:v", (req, res) => { */
app.get("/watch/:v/video/:n", (req, res) => {
    // console.log(req.params);
    res.send("Params");
})

// For starting server
app.listen(3012, function() {
    console.log("Server started");
});