import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

export function useChat({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const onMsg = (m) => setMessages((p) => [...p, m]);
    socket.on("chat:message", onMsg);
    return () => socket.off("chat:message", onMsg);
  }, []);

  const send = (message) => socket.emit("chat:send", { roomId, message });

  return { messages, send };
}
