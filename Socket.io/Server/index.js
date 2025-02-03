import express, { response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const port = 3000;

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello world !")
})

io.on("connection", (socket) => {
    console.log(`User connected , UserID : ${socket.id}`);

    // * Below I am sending a event from backend to the frontend 
    socket.emit("message", "This string is the data here !"); // ? Here by using emit , I am sending an event with some data

    // ! Here below by using broadcast I will be sending data to all other socket id's but not to the one which is sending this data
    socket.broadcast.emit("broadcastData" , "This message is for all of the socket id's out there !");

    // * Here below I am receiving a event from frontend to the backend 
    socket.on("welcome" , (payload) => {
        console.log(payload);
    });


    socket.on("disconnect" , () => {
        console.log("User Disconnected : " , socket.id);
    }); // ? Here disconnect is a pre build event and I will be triggering it in the frontend 
})

server.listen(port, () => {
    console.log(`Server running on PORT : ${port}`);
})