import express from "express";
import { Server } from "socket.io";
import {createServer} from "http";
import cors from "cors";

const app = express();
const port = 3000;

const server = createServer(app);
const io = new Server(server , {
    cors:{
        origin:"http://localhost:5173" , 
        methods:["GET" , "POST"] , 
        credentials:true
    }
});

app.use(cors())

app.get("/" ,  (req,  res) => {
    res.send("Hello world !")
})

io.on("connection" , (Socket) => {
    console.log(`User connected , UserID : ${Socket.id}`);
})

server.listen(port , () => {
    console.log(`Server running on PORT : ${port}`);
})