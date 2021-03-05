
module.exports = (socket, roomsObj) => {
    const allRooms = Object.keys(roomsObj);

    const onlineUsers = [];

    for (const room of allRooms) {
        const userArray = roomsObj[room].retrieve();
        if (userArray.length > 0) {
            for (const user of userArray) {
                const { id, userName, socketId } = user;
                onlineUsers.push({ id, userName, socketId });
            }
        }
    }

    socket.emit('USERS_ONLINE', onlineUsers);
};

