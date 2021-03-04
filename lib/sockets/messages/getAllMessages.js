const Message = require('../../models/Message');

module.exports = (socket, userId) => {

    const messageArray = Message.findByUserId(userId);

    socket.emit('GET_ALL_MESSAGES', messageArray);
};
