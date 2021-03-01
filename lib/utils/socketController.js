const createUser = require('../sockets/createUser');
const updateGameState = require('../sockets/updateGameState');

module.exports = (io, socket) => {
    console.log('Connected!');
    socket.on('CREATE_USER', () => createUser(io, socket));
    socket.on('GAME_STATE', localUser => updateGameState(io, socket, localUser));
};

