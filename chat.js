const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Keep track of connected users
let userCount = 0;

// Set up a connection event
io.on('connection', (socket) => {
  // Assign a user name based on the order of connection
  userCount++;
  socket.userName = `User ${userCount}`;

  // Broadcast when a user connects
  io.emit('chat message', { user: 'system', message: `${socket.userName} has joined the chat` });

  // Log user connection in the console
  console.log(`${socket.userName} connected`);

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', { user: socket.userName, message: msg });
  });

  // Listen for typing events
  socket.on('typing', () => {
    socket.broadcast.emit('typing', socket.userName);
  });

  // Listen for stop typing events
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing');
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    io.emit('chat message', { user: 'system', message: `${socket.userName} has left the chat` });

    // Log user disconnection in the console
    console.log(`${socket.userName} disconnected`);
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});