module.exports = (socketId, roomsObj, currentConnections) => {

    // const connectionIndex = currentConnections.findIndex(currentSocket => currentSocket === socketId);
    // currentConnections.splice(connectionIndex, 1);


    // let errantUsers;
    const roomNameArray = Object.keys(roomsObj);

    for (const roomName of roomNameArray) {

        // errantUsers = roomsObj[roomName].userArray.filter(user => !currentConnections.includes(user.socketId));

        // errantUsers.forEach(user => roomsObj[roomName].delete(user.socketId));
        roomsObj[roomName].delete(roomsObj[roomName].userArray['-1']);
    }

};
