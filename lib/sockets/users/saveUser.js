const User = require('../../models/User');

module.exports = async (socket, localUser) => {

    const savedUser = await User.update(localUser);

    socket.emit('SAVE_USER', savedUser);
}
    ;
