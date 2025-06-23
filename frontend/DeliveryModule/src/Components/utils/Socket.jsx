// src/socket.js
import { io } from "socket.io-client";

 const Socket = io("http://localhost:5003", {
  autoConnect: false,
  withCredentials: true,
});

export default Socket;
