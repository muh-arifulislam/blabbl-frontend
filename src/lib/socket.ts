import { io } from "socket.io-client";

// https://blabbl.vercel.app

const socket = io("https://blabbl.onrender.com", {
  withCredentials: true,
});

export default socket;
