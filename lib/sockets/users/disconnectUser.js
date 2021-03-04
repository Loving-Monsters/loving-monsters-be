

module.exports = (socketId, roomsObj) => {

    let roomName;
    const roomNameArray = Object.keys(roomsObj);

    for (const room of roomNameArray) {

        if (roomsObj[room].userArray.some(user => user.socketId === socketId)) {
            roomName = room;
        }
    }

    if (roomName) {
        roomsObj[roomName].delete(socketId);
    }
};
