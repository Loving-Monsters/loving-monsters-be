// const createUser = require('../sockets/createUser');
// // const updateCurrentRoom = require('../sockets/updateCurrentRoom');
// const disconnectUser = require('../sockets/disconnectUser');
// const sendMessage = require('../sockets/sendMessage');
// const sendChat = require('../sockets/sendChat');

// module.exports = (io, socket) => {
//     console.log(`Connected to ${socket.id}!`);

//     socket.on('disconnect', () => disconnectUser(socket.id));
//     socket.on('CREATE_USER', () => createUser(io, socket));
//     // socket.on('GAME_STATE', localUser => updateCurrentRoom(io, socket, localUser));
//     // socket.on('SEND_CHAT', localUser => sendChat(io, socket, localUser));
//     // socket.on('SEND_MESSAGE', newMessage => sendMessage(io, socket, newMessage));
// };

// 