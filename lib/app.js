const app = require('express');
const GameState = require('./models/GameState');
// const socketController = require('./utils/socketController');
const createUser = require('./sockets/createUser');
const updateCurrentRoom = require('./sockets/updateCurrentRoom');
const sendBulletin = require('./sockets/sendBulletin');
const changeRoom = require('./sockets/changeRoom.js');

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: process.env.CORS_ORIGIN
    }
});

const roomsObj = {
    hall: new GameState('hall'),
    classRoom: new GameState('classRoom')
};

io.on('connection', socket => {
    // socketController(io, socket, roomsObj);
    socket.on('CREATE_USER', () => createUser(io, socket, roomsObj));
    socket.on('GAME_STATE', localUser => updateCurrentRoom(io, socket, localUser, roomsObj[localUser.currentRoom]));
    socket.on('SEND_BULLETIN', newBulletin => sendBulletin(socket, newBulletin));
    socket.on('CHANGE_ROOM', ({ localUser, newRoom }) => changeRoom(socket, localUser, newRoom, roomsObj));

});

module.exports = { http, roomsObj };
