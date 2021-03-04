const User = require('../../models/User');

module.exports = async (socket, roomsObj) => {
    const newUser = await User.create(socket.id);
    console.log(')()()()()()()()()()()()()()(');
    console.log('User Created:');
    console.log(newUser);
    console.log(')()()()()()()()()()()()()()(');

    roomsObj.hallway.insert(newUser);
    socket.join(roomsObj.hallway.roomName);
    const userArray = roomsObj.hallway.retrieve();
    socket.emit('CREATE_USER', { newUser, userArray });
}; 
