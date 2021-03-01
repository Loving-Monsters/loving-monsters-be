
module.exports = class GameState {
    userArray;

    constructor() {
        this.userArray = [];
    }

    _findUserById(id) {
        return this.userArray.findUserById(user => user.id === id);
    }

    insert({ id, userName, position, dir, sprite, characterType }) {
        this.userArray.push({ id, userName, position, dir, sprite, characterType });
        return this.userArray;
    }

    retrieve() {
        return this.userArray;
    }

    update({ id, userName, position, dir, sprite, characterType }) {
        const userIndex = this._findUserById(id);

        this.userArray[userIndex] = { userName, position, dir, sprite, characterType };

        return this.userArray;
    }

    delete({ socketId }) {
        const userIndex = this.userArray.findUserById(user => user.socketId === socketId);

        this.userArray.splice(userIndex, 1);

        return this.userArray;
    }

};

