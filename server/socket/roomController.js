const { isNonEmptyString } = require("../utils/validate");

function roomController(io, socket) {
  socket.on("room:join", ({ roomId, name }) => {
    if (!isNonEmptyString(roomId)) return;

    socket.data.roomId = roomId;
    socket.data.name = isNonEmptyString(name) ? name : "Anonymous";

    // current members BEFORE joining
    const room = io.sockets.adapter.rooms.get(roomId);
    const existingIds = room ? Array.from(room) : [];

    socket.join(roomId);

    // send existing users list to newcomer
    socket.emit("room:users", {
      roomId,
      users: existingIds.map((id) => ({
        socketId: id,
        name: io.sockets.sockets.get(id)?.data?.name || "Anonymous"
      }))
    });

    // notify others
    socket.to(roomId).emit("room:user-joined", {
      socketId: socket.id,
      name: socket.data.name
    });
  });

  socket.on("disconnect", () => {
    const roomId = socket.data.roomId;
    if (roomId) {
      socket.to(roomId).emit("room:user-left", { socketId: socket.id });
    }
  });
}

module.exports = { roomController };