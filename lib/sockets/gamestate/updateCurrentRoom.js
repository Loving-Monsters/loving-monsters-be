
module.exports = (socket, localUser, currentRoom) => {

    if (localUser.currentRoom) {

        const updatedCurrentRoom = currentRoom.update(localUser);

        updatedCurrentRoom.userArray = updatedCurrentRoom.userArray.filter(user => user.id !== localUser.id);

        socket.emit('GAME_STATE', updatedCurrentRoom);
    }
};
