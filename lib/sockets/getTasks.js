const Task = require('../models/Task');

module.exports = async (socket, roomName) => {

    const allTasks = await Task.findByRoom(roomName);

    socket.emit('GET_TASKS', allTasks);
};
