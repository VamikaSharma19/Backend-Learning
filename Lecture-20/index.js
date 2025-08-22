const express = require("express");
const { m1, m2 } = require("./middleware/FirstMiddleware");
const { m3 } = require("./middleware/PathLevel");
const userRouter = require("./routes/UserRoutes");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(m1);
// app.use(m2);

app.use("/api/users", userRouter);

app.get("/health", m3, (req, res, next) => {
    console.log("Running controller function");
    // Nothing will be executed in function after a return statement
    return res.json ({
        status : "OK",
        message : "Server running ok"
    })
    // console.log("after response")
})
app.use(m2);

app.get("/home", (req, res) => {
    console.log("Running home endpoint");
    res.json ({
        success : true,
        message : "Welcome to home page"
    })
})
// app.use(m2);

app.listen(3008, () => {
    console.log("Server started");
})