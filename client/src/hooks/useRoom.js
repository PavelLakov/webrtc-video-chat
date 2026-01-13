import { useEffect, useMemo, useState } from "react";
import { socket } from "../lib/socket";
import { createWebrtcManager } from "../webrtc/webrtcManager";

export function useRoom({ localStreamRef }) {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("room-1");
  const [name, setName] = useState("Pavel");
  const [remotes, setRemotes] = useState([]);

  const webrtc = useMemo(
    () =>
      createWebrtcManager({
        socket,
        localStreamRef,
        onRemoteUpdate: setRemotes,
      }),
    [localStreamRef]
  );

  useEffect(() => {
    socket.on("room:users", async ({ users }) => {
      for (const u of users) {
        webrtc.ensurePeer(u.socketId, u.name);
        await webrtc.callPeer(u.socketId, u.name);
      }
    });

    socket.on("room:user-joined", ({ socketId, name }) => {
      webrtc.ensurePeer(socketId, name);
    });

    socket.on("room:user-left", ({ socketId }) => {
      webrtc.removePeer(socketId);
    });

    socket.on("webrtc:offer", webrtc.handleOffer);
    socket.on("webrtc:answer", webrtc.handleAnswer);
    socket.on("webrtc:ice-candidate", webrtc.handleIceCandidate);

    return () => {
      socket.removeAllListeners();
    };
  }, [webrtc]);

  const join = () => {
    socket.emit("room:join", { roomId, name });
    setJoined(true);
  };

  return { joined, roomId, setRoomId, name, setName, remotes, join };
}
