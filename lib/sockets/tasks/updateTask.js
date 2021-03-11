const Task = require('../../models/Task');

module.exports = async(socket, taskObj) => {

    await Task.update(taskObj);
    const allTasks = Task.findByRoom(taskObj.roomName);

    socket.emit('GET_TASKS', allTasks);
};
