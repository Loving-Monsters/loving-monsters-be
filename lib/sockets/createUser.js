const User = require('../models/User');

module.exports = (io, socket) => {

    const newUser = new User.create(socket.id);
    io.to(socket.id).emit('CREATE_USER', { newUser });
}; 
