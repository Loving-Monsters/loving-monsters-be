module.exports = async (socket, storedUser, currentRoom) => {
    currentRoom.insert(storedUser, socket.id);
    socket.join(storedUser.currentRoom);
    socket.emit('LOG_IN', storedUser);
};
