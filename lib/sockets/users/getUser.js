const User = require('../../models/User');

module.exports = async (socket, { userName, password }) => {

    const savedUser = await User.retrieve(userName, password, socket.id);

    socket.emit('LOG_IN', savedUser);
};
