
module.exports = (io, socket, localUser, currentRoom) => {

    if (localUser.currentRoom) {

        const updatedCurrentRoom = currentRoom.update(localUser);

        const filteredCurrentRoom = updatedCurrentRoom.userArray.filter(user => user.id !== localUser.id);

        io.to(socket.id).emit('GAME_STATE', filteredCurrentRoom);

    }
};
