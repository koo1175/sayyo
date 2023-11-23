const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "*", // 모든 도메인을 허용하거나, 클라이언트 애플리케이션이 실행되는 도메인을 지정하세요.
      methods: ["GET", "POST"] // 허용할 HTTP 메소드를 지정하세요.
    }
  });

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
