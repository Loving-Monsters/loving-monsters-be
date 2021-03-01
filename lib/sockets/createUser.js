const User = require('../models/User');

module.exports = (io, socket, gameState) => {
    const newUser = new User(socket.id);
    console.log(newUser);
    gameState.insert(newUser);
    io.to(socket.id).emit('CREATE_USER', { newUser });
}; 
