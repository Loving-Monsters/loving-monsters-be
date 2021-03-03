
module.exports = class GameState {
    roomName;
    userArray;

    constructor(roomName) {
        this.userArray = [];
        this.roomName = roomName;
    }

    _findUserById(id) {
        return this.userArray.findIndex(user => user.id === id);
    }

    insert({ id, userName, position, dir, avatar, characterType, socketId }) {
        this.userArray.push({ id, userName, position, dir, avatar, characterType, socketId });
        return { userArray: this.userArray, roomName: this.roomName };
    }

    retrieve() {
        return this.userArray;
    }

    update({ id, userName, position, dir, avatar, characterType, socketId }) {
        const userIndex = this._findUserById(id);
        this.userArray[userIndex] = { id, userName, position, dir, avatar, characterType, socketId };
        return { userArray: this.userArray, roomName: this.roomName };
    }

    delete(socketId) {
        const userIndex = this.userArray.findIndex(user => user.socketId === socketId);

        this.userArray.splice(userIndex, 1);

        return { userArray: this.userArray, roomName: this.roomName };
    }

};

