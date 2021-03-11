const app = require('express');
const GameState = require('./models/GameState');
const disconnectUser = require('./sockets/users/disconnectUser');
const createUser = require('./sockets/users/createUser');
const updateCurrentRoom = require('./sockets/gamestate/updateCurrentRoom');
const sendBulletin = require('./sockets/bulletins/sendBulletin');
const changeRoom = require('./sockets/users/changeRoom');
const onlineUsers = require('./sockets/users/onlineUsers');
const sendMessage = require('./sockets/messages/sendMessage');
const getUserMessages = require('./sockets/messages/getUserMessages');
const createTask = require('./sockets/tasks/createTask');
const updateTask = require('./sockets/tasks/updateTask');
const getTasks = require('./sockets/tasks/getTasks');
const deleteTask = require('./sockets/tasks/deleteTask');
const openWhiteBoard = require('./sockets/tasks/openWhiteBoard');
const getUser = require('./sockets/users/getUser');
const saveUser = require('./sockets/users/saveUser');
const getAllMessages = require('./sockets/messages/getAllMessages');
const refreshUser = require('./sockets/users/refreshUser');

const hallwayBalls = require('./data/balls/hallwayBalls');
const hallwayWalls = require('./data/walls/hallwayWalls');
const hallway2Balls = require('./data/balls/hallway2Balls');
const hallway2Walls = require('./data/walls/hallway2Walls');
const hallway3Balls = require('./data/balls/hallway3Balls');
const hallway3Walls = require('./data/walls/hallway3Walls');
const classroomBalls = require('./data/balls/classroomBalls');
const classroomWalls = require('./data/walls/classroomWalls');


const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: process.env.CORS_ORIGIN
    }
});

const roomsObj = {
    hallway: new GameState('hallway', hallwayBalls, hallwayWalls),
    classroom: new GameState('classroom', classroomBalls, classroomWalls),
    classroom2: new GameState('classroom2'),
    classroom3: new GameState('classroom3'),
    hallway2: new GameState('hallway2', hallway2Balls, hallway2Walls),
    hallway3: new GameState('hallway3', hallway3Balls, hallway3Walls),
    courtyard: new GameState('courtyard'),
};

io.on('connection', socket => {
    // game state sockets
    socket.on('disconnect', () => disconnectUser(socket.id, roomsObj));
    socket.on('GAME_STATE', localUser => updateCurrentRoom(socket, localUser, roomsObj[localUser.currentRoom]));
    // user sockets
    socket.on('CREATE_USER', newUser => createUser(socket, roomsObj, newUser));
    socket.on('LOG_IN', loginInfo => getUser(socket, loginInfo, roomsObj));
    socket.on('REFRESH', storedUser => refreshUser(socket, storedUser, roomsObj[storedUser.currentRoom]));
    socket.on('SAVE_USER', localUser => saveUser(socket, localUser));
    socket.on('CHANGE_ROOM', ({ localUser, newRoom }) => changeRoom(socket, localUser, newRoom, roomsObj));
    // bulletin sockets
    socket.on('SEND_BULLETIN', newBulletin => sendBulletin(io, newBulletin));
    // user online socket
    socket.on('USERS_ONLINE', () => onlineUsers(socket, roomsObj));
    // message sockets
    socket.on('SEND_MESSAGE', ({ userId, newMessage }) => sendMessage(io, socket, newMessage, userId));
    socket.on('GET_MESSAGES', userIds => getUserMessages(socket, userIds));
    socket.on('GET_ALL_MESSAGES', userId => getAllMessages(socket, userId));
    // task sockets
    socket.on('OPEN_WHITEBOARD', roomName => openWhiteBoard(socket, roomName));
    socket.on('CREATE_TASK', newTask => createTask(socket, newTask));
    socket.on('GET_TASKS', roomName => getTasks(socket, roomName));
    socket.on('UPDATE_TASK', taskObj => updateTask(socket, taskObj));
    socket.on('DELETE_TASK', taskId => deleteTask(socket, taskId));
});

module.exports = { http };
