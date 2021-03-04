
module.exports = (socket, roomsObj) => {
    const allRooms = roomsObj.keys();
    const onlineUsers = allRooms.map(room => {
        const userArray = room.retrieve();
        return userArray.map(({ id, userName, socketId }) => {
            return { id, userName, socketId };
        });

    });

    socket.emit('USERS_ONLINE', onlineUsers);
};

