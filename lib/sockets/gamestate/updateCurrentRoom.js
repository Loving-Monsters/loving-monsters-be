
module.exports = (socket, localUser, currentRoom, roomsObj) => {

    if (localUser.currentRoom) {

        const updatedCurrentRoom = currentRoom.update(localUser, roomsObj);

        updatedCurrentRoom.userArray = updatedCurrentRoom.userArray.filter(user => user.id !== localUser.id);

        socket.emit('GAME_STATE', updatedCurrentRoom);
    }
};
