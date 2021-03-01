const createUser = require('../sockets/createUser').default;
const updateGameState = require('../sockets/updateGameState').default;
const disconnectUser = require('../sockets/disconnectUser');

module.exports = (io, socket) => {
    console.log(`Connected to ${socket.id}!`);

    socket.on('disconnect', () => disconnectUser(socket.id));
    socket.on('CREATE_USER', () => createUser(io, socket));
    socket.on('GAME_STATE', localUser => updateGameState(io, socket, localUser));
};

