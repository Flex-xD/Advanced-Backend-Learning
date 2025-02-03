import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, Typography, TextField, } from "@mui/material";

const App = () => {

  const [message, setMessage] = useState();
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const socket = io("http://localhost:3000"); //? making a connection with the backend 
  useEffect(() => {
    socket.on("connect", () => { // ? connect is a pre build event used to connect to the socket
      console.log("Connected , ID : ", socket.id);
    });

    socket.on("message", (payload) => { // ? making a connection to the event that is being sent from the backend !
      console.log(payload);
    })

    socket.on("broadcastData", (data) => { //? Recieving a broadcast event
      console.log(data);
    })

    socket.emit("welcome", "First message recievd ! now connected to the backend !"); //? Sending an event "welcome"


    return () => {
      socket.disconnect();
    }
  }, [])
  return (
    <Container>
      <Typography varient="h1" component="div" gutterbottom>
        Welcome to socket.io !
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField value={message} onChange={e=setMessage(e.target.value)} id="outlined-basic" label="Out1ined" variant="outlined" />
        <Button variant="contained" color="primary">
          Send
        </Button>
      </form>
    </Container>
  )
}

export default App;
