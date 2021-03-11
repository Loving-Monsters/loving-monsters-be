module.exports = (socket, localUser, newRoom, roomsObj) => {
    roomsObj[localUser.currentRoom].delete(localUser.socketId);
    roomsObj[newRoom].insert(localUser);

    socket.emit('CHANGE_ROOM', newRoom);
};

