const fs = require("fs");
console.log ("Start");
setTimeout(() => {
    console.log("Timer Callback")
},0)
setImmediate(() => {
    console.log("Set Immediate Callback")
})
function dosometask(){
    return new Promise((resolve, reject)=>{
        resolve("Promise callback")
    })
}
fs.readFile("Demo.txt", (Data) => {
    console.log ("Poll phase callback");
    setTimeout(() => {
        console.log("Timer 2");
    },0)
    setImmediate(() => {
        console.log("Immd 2")
    })
})
console.log ("End");
dosometask().then((res)=>{
    console.log(res)
})
.catch((err)=>{
    console.log(err)
})
process.nextTick(()=>{
    console.log("Next tick")
})