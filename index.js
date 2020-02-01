const express = require('express');
const bodyparser = require('body-parser');
const PORT = 3000

const app = express();
app.use(bodyparser.json());

const server = app.listen(PORT);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('client-message', ({room, data}) => {
    socket.broadcast.to(room).emit('server-message', data);
  });
});

console.log('server running');