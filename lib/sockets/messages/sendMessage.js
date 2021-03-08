const Message = require('../../models/Message');

module.exports = async (io, socket, newMessage, userId) => {

    const createdMessage = await Message.create(newMessage);

    const messageArray = await Message.findByUserId(userId);

    const sortedMessageObj = await Message.sortMessages(messageArray, userId);

    socket.emit('RECIEVE_MESSAGE', sortedMessageObj);
};

