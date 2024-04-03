let readyPlayerCount = 0;

function listen(io) {
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
}

module.exports = {
  listen,
};
