import { useEffect } from "react";
import {io} from "socket.io-client";

const App = () => {
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect" , () => {
      console.log("Connected , ID : " , socket.id);
    })
  } , [])
  return (
    <div>
      App
    </div>
  )
}

export default App;
