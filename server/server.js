const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const server = http.createServer(app);
const { connectSocket } = require("./middlewares/socket");
const io = new Server(server , {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

connectSocket(io);

app.use("/" , userRouter);

server.listen(4000,()=>{
    console.log("server started");
})