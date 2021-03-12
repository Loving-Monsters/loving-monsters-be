module.exports = async (socket, storedUser, currentRoom) => {



    if (socket.id) {
        currentRoom.insert(storedUser, socket.id);
        socket.join(storedUser.currentRoom);
        socket.emit('LOG_IN', storedUser);
    } else {
        socket.emit('DUPLICATE_USER', null);
    }
};
