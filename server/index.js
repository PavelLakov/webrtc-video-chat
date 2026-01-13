const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { registerHandlers } = require("./socket/registerHandlers");

const app = express();

/**
 * DEV MODE: allow any origin so other PCs on your LAN can connect.
 * Later you can restrict this to your exact frontend URL(s).
 */
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.get("/health", (_, res) => res.json({ ok: true }));

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

registerHandlers(io);

const PORT = 3001;

/**
 * IMPORTANT: bind to all network interfaces
 */
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
