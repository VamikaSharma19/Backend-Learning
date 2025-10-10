const { WebSocketServer } = require('ws');

// Clients can connect to ws://localhost:8086
const ws = new WebSocketServer({ port: 8086 });

// The 'connection' event triggers whenever a new client connects
ws.on("connection", function (socket) {
// 'socket' represents the connected client (Used to send and recieve message from that connected client)
    console.log(socket); 

    setInterval(() => {
// 'socket.send()' sends data from the server to the client
        socket.send("Hi, welcome " + Math.random());
    }, 500);

// The 'message' event triggers when the client sends a message to the server
    socket.on('message', function message(data) {
        console.log(data.toString());
    });
});