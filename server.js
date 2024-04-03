const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3000;

let readyPlayerCount = 0;

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  socket.on("disconnect", (reason) => {
    console.log(`Client disconnected ${socket.id}: ${reason}`);
  });

  socket.on("ready", () => {
    console.log(`Player Ready! ${socket.id}`);
    readyPlayerCount++;

    if (readyPlayerCount === 2) {
      io.emit("startGame", socket.id);
    }
  });

  socket.on("paddleMove", (paddleData) => {
    socket.broadcast.emit("paddleMove", paddleData);
  });

  socket.on("ballMove", (ballData) => {
    socket.broadcast.emit("ballMove", ballData);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
