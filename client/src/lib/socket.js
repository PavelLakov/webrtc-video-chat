import { io } from "socket.io-client";

const URL =
  import.meta.env.VITE_SOCKET_URL || `http://${window.location.hostname}:3001`;

export const socket = io(URL, {
  transports: ["websocket"],
});
