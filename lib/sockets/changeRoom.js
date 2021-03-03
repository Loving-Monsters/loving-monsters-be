

module.exports = (socket, localUser, newRoom, roomsObj) => {
    roomsObj[localUser.currentRoom].delete(localUser.socketId);
    roomsObj[newRoom].insert(localUser);
    const userArray = roomsObj[newRoom].retrieve();

    socket.emit('CHANGE_ROOM', userArray);
};

