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
const createTask = require('./sockets/createTask');
const updateTask = require('./sockets/updateTask');
const getTasks = require('./sockets/getTasks');
const deleteTask = require('./sockets/deleteTask');
const getUser = require('./sockets/getUser');
const saveUser = require('./sockets/saveUser');

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
    // game state sockets
    socket.on('disconnect', () => disconnectUser(socket.id, roomsObj));
    socket.on('GAME_STATE', localUser => updateCurrentRoom(io, socket, localUser, roomsObj[localUser.currentRoom]));
    // user sockets
    socket.on('CREATE_USER', () => createUser(socket, roomsObj));
    socket.on('GET_USER', loginInfo => getUser(socket, loginInfo));
    socket.on('SAVE_USER', localUser => saveUser(socket, localUser));
    socket.on('CHANGE_ROOM', ({ localUser, newRoom }) => changeRoom(socket, localUser, newRoom, roomsObj));
    // bulletin sockets
    socket.on('SEND_BULLETIN', newBulletin => sendBulletin(socket, newBulletin));
    // user online socket
    socket.on('USERS_ONLINE', () => onlineUsers(socket, roomsObj));
    // message sockets
    socket.on('SEND_MESSAGE', newMessage => sendMessage(io, socket, newMessage));
    socket.on('GET_MESSAGES', userIds => getUserMessages(socket, userIds));
    // task sockets
    socket.on('CREATE_TASK', newTask => createTask(socket, newTask));
    socket.on('GET_TASKS', roomName => getTasks(socket, roomName));
    socket.on('UPDATE_TASK', taskObj => updateTask(socket, taskObj));
    socket.on('DELETE_TASK', taskId => deleteTask(socket, taskId));
});

module.exports = { http };
