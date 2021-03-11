const Message = require('../../models/Message');

module.exports = async(socket, userId) => {

    const messageArray = await Message.findByUserId(userId);

    if(messageArray) {
        const sortedMessageObj = await Message.sortMessages(messageArray, userId);

        socket.emit('RECIEVE_MESSAGE', sortedMessageObj);
    }
};
