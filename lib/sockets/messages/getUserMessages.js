const Message = require('../../models/Message');

module.exports = (socket, userIds) => {
    const messageArray = Message.findMessages(userIds);

    socket.emit('GET_MESSAGES', messageArray);
};

