const { roomController } = require("./roomController");
const { chatController } = require("./chatController");
const { signalingController } = require("./signalingController");

function registerHandlers(io) {
  io.on("connection", (socket) => {
    roomController(io, socket);
    chatController(io, socket);
    signalingController(io, socket);
  });
}

module.exports = { registerHandlers };