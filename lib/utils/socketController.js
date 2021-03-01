const createUser = require('../sockets/createUser').default;
const updateGameState = require('../sockets/updateGameState');
const disconnectUser = require('../sockets/disconnectUser');

module.exports = (io, socket, gameState) => {
    console.log(`Connected to ${socket.id}!`);

    socket.on('disconnect', () => disconnectUser(gameState, socket.id));
    socket.on('CREATE_USER', () => createUser(io, socket, gameState));
    socket.on('GAME_STATE', localUser => updateGameState(io, socket, gameState, localUser));
};

