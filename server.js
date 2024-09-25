// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path'); // Added for path module

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

// Serve the moderator folder
app.use('/moderator', express.static(path.join(__dirname, 'moderator')));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('login', (data) => {
    // For simplicity, just broadcast the login data to all clients.
    io.emit('login', data);
  });

    // New event to change the screen
    socket.on('changeScreen', (screen) => {
        io.emit('changeScreen', screen);
    });

    // New event to change the screenn
    socket.on('changeScreen2', (screen2) => {
        io.emit('changeScreen2', screen2);
      });

    // New event to change the screen
    socket.on('changeScreen3', (screen3) => {
    io.emit('changeScreen3', screen3);
     });
    // New event to change the screen
    socket.on('changeScreen4', (screen4) => {
        io.emit('changeScreen4', screen4);
      });
        // New event to change the screen
    socket.on('changeScreen5', (screen5) => {
        io.emit('changeScreen5', screen5);
    });


  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
