const app = require('express');

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: process.env.CORS_ORIGIN
    }
});

io.on('connection', socket => {
    socketController(io, socket);
});

module.exports = app;
