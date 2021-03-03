const app = require('express');
const GameState = require('./models/GameState');
const disconnectUser = require('./sockets/disconnectUser');
const createUser = require('./sockets/createUser');
const updateCurrentRoom = require('./sockets/updateCurrentRoom');
const sendBulletin = require('./sockets/sendBulletin');
const changeRoom = require('./sockets/changeRoom');
const onlineUsers = require('./sockets/onlineUsers');
const sendMessage = require('./sockets/sendMessage');
const getUserMessages = require('./sockets/getUserMessages');

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
    socket.on('disconnect', () => disconnectUser(socket.id));
    socket.on('CREATE_USER', () => createUser(io, socket, roomsObj));
    socket.on('GAME_STATE', localUser => updateCurrentRoom(io, socket, localUser, roomsObj[localUser.currentRoom]));
    socket.on('SEND_BULLETIN', newBulletin => sendBulletin(socket, newBulletin));
    socket.on('CHANGE_ROOM', ({ localUser, newRoom }) => changeRoom(socket, localUser, newRoom, roomsObj));
    socket.on('USERS_ONLINE', () => onlineUsers(socket, roomsObj));
    socket.on('SEND_MESSAGE', newMessage => sendMessage(io, socket, newMessage));
    socket.on('GET_MESSAGES', userIds => getUserMessages(socket, userIds));
});

module.exports = { http };
