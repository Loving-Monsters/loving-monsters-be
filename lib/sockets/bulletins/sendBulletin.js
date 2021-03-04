

module.exports = (socket, { roomName, text }) => {
    const timestamp = Date.now();

    socket.to(roomName).emit('RECIEVE_BULLETIN', { text, timestamp });
};
