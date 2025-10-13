const { WebSocketServer } = require("ws");
const ws = new WebSocketServer({ port : 8886}) 
const { v4 : uuidv4 } = require('uuid');

ws.on("connection", function(socket) {
    console.log("User connected")
    socket.on("message", function(message) {
        console.log("Message received" + " " + message.toString()) 
        if(message.toString() === "ping") {
            socket.send("pong")
        }
    })
})

// Now we are creating another application for broadcasting.
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

let rooms = new Map();
ws.on("connection", (socket) => {
  console.log("A new user connected");

  socket.on("message", function(message) {
    let parseMessage = JSON.parse(message);
    let { type, payload } = parseMessage;

    if (type === "join") {
      let { roomId } = payload;

      if (!rooms.get(roomId)) {
        rooms.set(roomId, new Set());
      }

      rooms.get(roomId).add(socket);
      console.log(rooms);
      socket.roomId = roomId;
      socket.send("Added to room");
    }
     else if (type === "chat") {
      let { message } = payload; 
      let { roomId } = socket; 
      let allClients = rooms.get(roomId);
      allClients.forEach((s) => {
        s.send(message.toString());
      });
    }
    else if(type == "create") {
      let roomId = uuidv4();
      socket.send(JSON.stringify ({
        type : "create",
        payload : {
          "roomId" : roomId
        }
      }))
    }
  });
});