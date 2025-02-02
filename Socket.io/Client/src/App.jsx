import { useEffect } from "react";
import {io} from "socket.io-client";

const App = () => {
  const socket = io("http://localhost:3000"); //? making a connection with the backend 
  useEffect(() => {
    socket.on("connect" , () => { // ? connect is a pre build event used to connect to the socket
      console.log("Connected , ID : " , socket.id);
    });

    socket.on("message" , (payload) => { // ? making a connection to the event that is being sent from the backend !
      console.log(payload);
    })

    socket.on("broadcastData", (data) => { //? Recieving a broadcast event
      console.log(data); 
    })

    socket.emit("welcome" , "First message recievd ! now connected to the backend !"); //? Sending an event "welcome"

  } , [])
  return (
    <div>
      App
    </div>
  )
}

export default App;
