import { io } from "socket.io-client";

// https://blabbl.vercel.app

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

export default socket;
