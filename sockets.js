let readyPlayerCount = 0;

function listen(io) {
  io.on("connection", (socket) => {
    console.log("Client connected", socket.id);
    let room;

    socket.on("ready", () => {
      room = "room" + Math.floor(readyPlayerCount / 2);
      socket.join(room);

      console.log(`Player Ready! ${socket.id}`, room);
      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        io.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client disconnected ${socket.id}: ${reason}`);
      socket.leave(room);
    });
  });
}

module.exports = {
  listen,
};
