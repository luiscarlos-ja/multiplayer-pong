const server = require("http").createServer();
const io = require("socket.io")(server);

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("message", (message) => {
    console.log(`Message received: ${message}`);
    socket.broadcast.emit("message", message);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
