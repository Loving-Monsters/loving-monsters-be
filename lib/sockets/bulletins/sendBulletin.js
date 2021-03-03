

module.exports = (socket, { roomName, sender, text }) => {
    const timestamp = Date.now();

    socket.to(roomName).emit('RECIEVE_BULLETIN', { sender, text, timestamp });
};
