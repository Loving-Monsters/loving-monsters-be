const User = require('../models/User');

module.exports = async (io, socket, gameState) => {
    const newUser = await User.create(socket.id);
    console.log(')()()()()()()()()()()()()()(');
    console.log('User Created:');
    console.log(newUser);
    console.log(')()()()()()()()()()()()()()(');

    gameState.insert(newUser);
    io.to(socket.id).emit('CREATE_USER', { newUser, userArray: gameState.retrieve() });
}; 
