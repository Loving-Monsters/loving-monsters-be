const Task = require('../../models/Task');

module.exports = async (socket, newTask) => {

    await Task.create(newTask);
    const allTasks = await Task.findByRoom(newTask.roomName);

    socket.emit('CREATE_TASK', allTasks);
};
