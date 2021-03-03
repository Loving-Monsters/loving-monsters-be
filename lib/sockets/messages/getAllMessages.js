const Message = require('../../models/Message');

module.exports = (socket, userId) => {

    const messageArray = Message.findByUserid(userId);

    socket.emit('GET_ALL_MESSAGES', messageArray);
};
