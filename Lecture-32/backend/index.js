const { WebSocketServer } = require("ws");
const ws = new WebSocketServer({ port : 8888}) 

// Each user has their own socket connection
ws.on("connection", function(socket) {
    console.log("User connected")
// Here, the client is sending a message, and that message is displayed on the server
    socket.on("message", function(message) {
// For example, if we type 'ping' in Postman, it will show "Message received ping" on the server
        console.log("Message received" + " " + message.toString()) 
        if(message.toString() === "ping") {
            socket.send("pong")
        }
    })
})

/* Now we are creating another application for broadcasting.
Earlier, when a user sent a message to the server, the server only responded back to that specific user.
But now we want to make it so that when one user sends a message to the server, 
The server should send that message as a response to all connected users. */
 
/* let allSocket = []
ws.on("connection", function(socket) {
    console.log("User connected")
    allSocket.push(socket);
    socket.on("message", function(message) {
        console.log("Message received" + " " + message.toString()) 
        allSocket.forEach((s) => {
            s.send(message.toString())
        })
    })
}) */