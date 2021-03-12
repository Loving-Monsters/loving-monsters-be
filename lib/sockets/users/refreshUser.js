module.exports = async (socket, storedUser, currentRoom, roomsObj) => {

    const roomNameArray = Object.keys(roomsObj);
    let isAlreadyLoggedIn = false;

    for (const roomName of roomNameArray) {
        isAlreadyLoggedIn = roomsObj[roomName].userArray.includes(user => user.id === storedUser.id);
    }


    if (socket.id && !isAlreadyLoggedIn) {
        currentRoom.insert(storedUser, socket.id);
        socket.join(storedUser.currentRoom);
        socket.emit('LOG_IN', storedUser);
    } else {
        socket.emit('DUPLICATE_USER', null);
    }
};
