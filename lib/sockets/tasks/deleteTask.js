
const Task = require('../../models/Task');

module.exports = async (socket, taskId) => {

    const deletedTask = await Task.delete(taskId);
    const allTasks = Task.findByRoom(deletedTask.roomName);

    socket.emit('DELETE_TASK', allTasks);
};
