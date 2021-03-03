const User = require('../../models/User');

module.exports = async (socket, { userName, passwordHash }) => {

    const savedUser = await User.retrieve(userName, passwordHash, socket.id);

    socket.emit('GET_USER', savedUser);
};
