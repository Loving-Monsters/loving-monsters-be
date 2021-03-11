module.exports = async(socket, storedUser, currentRoom) => {
    currentRoom.insert(storedUser);
    socket.join(storedUser.currentRoom);
    socket.emit('LOG_IN', storedUser);
};
