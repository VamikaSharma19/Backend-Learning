// We have used thunder client in this folder
const express = require("express");
const {Queue, Worker} = require("bullmq");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let codeQueue = new Queue("code-queue", {
    connection : {
    host : 'localhost',
    port : 6379,
  },
});

app.post("/api/submission", async(req,res) => {
    let {qId, code, language} = req.body;

    let job = await codeQueue.add("code-queue", {
        qId, code, language
    })
    console.log(job.id);
    console.log(job);
    res.json ({
        submissionId : job.id
    })
})

let worker = new Worker("code-queue", function(job) {
    console.log(job.data);
    setTimeout(() => {
        console.log ({
            qId : job.data.qId,
            status : "success",
            time : "4ms",
            beat : "top 10%"
    })
        return {
        qId : job.data.qId,
        status : "success",
        time : "4ms",
        beat : "top 10%"
    }}, 5000)
}, {
connection : {
    host : 'localhost',
    port : 6379,
  },})

worker.on("error", function(err) {
    console.log(err);
})

app.listen(3013, () => {
    console.log("Server started");
})