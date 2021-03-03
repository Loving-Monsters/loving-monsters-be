const User = require('../models/User');

module.exports = async (socket, roomsObj) => {
    const newUser = await User.create(socket.id);
    console.log(')()()()()()()()()()()()()()(');
    console.log('User Created:');
    console.log(newUser);
    console.log(')()()()()()()()()()()()()()(');

    roomsObj.hall.insert(newUser);
    socket.join(roomsObj.hall.roomName);
    const userArray = roomsObj.hall.retrieve();
    socket.emit('CREATE_USER', { newUser, userArray });
}; 
