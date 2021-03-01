const app = require('express');
const GameState = require('./models/GameState');
const socketController = require('./utils/socketController');

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: process.env.CORS_ORIGIN
    }
});

const gameState = new GameState();

io.on('connection', socket => {
    socketController(io, socket, gameState);
});



module.exports = { http, gameState };

