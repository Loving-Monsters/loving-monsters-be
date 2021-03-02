const Message = require('../models/Message');

module.exports = (io, socket, newMessage) => {

    const createdMessage = Message.create(newMessage);

};

