const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Get rid of app.listen and update it with following

server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});