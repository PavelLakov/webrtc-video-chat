function signalingController(io, socket) {
  socket.on("webrtc:offer", ({ to, sdp }) => {
    io.to(to).emit("webrtc:offer", {
      from: socket.id,
      sdp,
      name: socket.data.name || "Anonymous",
    });
  });

  socket.on("webrtc:answer", ({ to, sdp }) => {
    io.to(to).emit("webrtc:answer", { from: socket.id, sdp });
  });

  socket.on("webrtc:ice-candidate", ({ to, candidate }) => {
    io.to(to).emit("webrtc:ice-candidate", { from: socket.id, candidate });
  });
}

module.exports = { signalingController };
