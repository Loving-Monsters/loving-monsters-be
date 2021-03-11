const User = require('../../models/User');

module.exports = async(socket, roomsObj, newUser) => {
    const nameTaken = await User.findByName(newUser.userName);

    if(!nameTaken) {

        const createdUser = await User.create(socket.id, newUser);

        roomsObj.hallway.insert(createdUser);
        socket.join('hallway');

        socket.emit('CREATE_USER', createdUser);
    }
    else {
        socket.emit('CREATE_USER', false);
    }
};
