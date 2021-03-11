const User = require('../../models/User');

module.exports = async (socket, { userName, password }, roomsObj) => {

    const savedUser = await User.retrieve(userName, password, socket.id);

    roomsObj.hallway.insert(savedUser);
    socket.join('hallway');


    socket.emit('LOG_IN', savedUser);
};
