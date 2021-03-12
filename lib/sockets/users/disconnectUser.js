module.exports = (socketId, roomsObj, currentConnections) => {
    console.log('🚀 ~ file: disconnectUser.js ~ line 2 ~ socketId', socketId);
    console.log('🚀 ~ file: disconnectUser.js ~ line 2 ~ currentConnections', currentConnections);

    const connectionIndex = currentConnections.findIndex(currentSocket => currentSocket === socketId);
    currentConnections.splice(connectionIndex, 1);

    console.log('🚀 ~ file: disconnectUser.js ~ line 12 ~ currentConnections', currentConnections);

    let errantUsers;
    const roomNameArray = Object.keys(roomsObj);

    for (const roomName of roomNameArray) {

        errantUsers = roomsObj[roomName].userArray.filter(user => !currentConnections.includes(user.socketId));

        errantUsers.forEach(user => roomsObj[roomName].delete(user.socketId));
        roomsObj[roomName].delete(roomsObj[roomName].userArray['-1']);
    }

};
