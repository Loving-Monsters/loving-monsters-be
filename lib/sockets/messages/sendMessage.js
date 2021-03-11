const Message = require('../../models/Message');

module.exports = async(io, socket, newMessage, userId) => {

    await Message.create(newMessage);

    const messageArray = await Message.findByUserId(userId);

    const sortedMessageObj = await Message.sortMessages(messageArray, userId);

    socket.emit('RECIEVE_MESSAGE', sortedMessageObj);
};

