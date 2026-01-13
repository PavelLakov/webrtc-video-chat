const { isNonEmptyString } = require("../utils/validate");
const { randomId } = require("../utils/ids");

function chatController(io, socket) {
  socket.on("chat:send", ({ roomId, message }) => {
    if (!isNonEmptyString(roomId) || !isNonEmptyString(message)) return;

    io.to(roomId).emit("chat:message", {
      id: randomId(),
      from: { socketId: socket.id, name: socket.data.name || "Anonymous" },
      message,
      ts: Date.now(),
    });
  });
}

module.exports = { chatController };
