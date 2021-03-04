

module.exports = (io, { roomName, text }) => {
    const timestamp = Date.now();
    const unread = true;

    io.to(roomName).emit('RECIEVE_BULLETIN', { text, timestamp, unread });
    console.log({ text, timestamp, unread, roomName });
};
