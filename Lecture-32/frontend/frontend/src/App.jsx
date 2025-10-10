import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
/* We should not make the socket global because it will cause an error —
Every time the component updates, a new socket connection will be created.
But in WebSocket, only one connection should be made at a time. */

let [ws, setWs] = useState(null)  // To create a state variable (used for dynamic and changeable data).
let inputRef = useRef()  // To store any DOM element; different from useState because it does not trigger component re-rendering.

useEffect(() => {
    const socket = new WebSocket("ws://localhost:8888");
    socket.onmessage = ((e) => {
      console.log(e.data);
    })
    setWs(socket);
},[]) /* This [] is our dependency array. Without it, the connection will be created every time the component updates.
We use it for mounting (to run this effect only once when the component loads). */

function sendMessage() {
  let message = inputRef.current.value  // inputRef is an object that gives access to our DOM element.
  ws.send(message)
  inputRef.current.value = ""
  /* ws.onopen = () => {
    console.log("Connected to WebSocket server");
    ws.send("ping");  // This will send a test message
  } */
}

  return (
    <>
      <h1> Ping Pong </h1>
      <input ref = {inputRef} type = "text"/>
      <button onClick = {sendMessage}> Send </button>
    </>
  )
}

export default App