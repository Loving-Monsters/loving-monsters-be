
module.exports = class GameState {
    userArray;

    constructor(row) {
        this.userArray = row.userArray;
    }

    _findIndex(userName) {
        return this.userArray.findIndex(user => user.userName === userName);
    }

    insert({ userName, position, dir, sprite, characterType }) {
        this.userArray.push({ userName, position, dir, sprite, characterType });
        return this.userArray;
    }

    retrieve() {
        return this.userArray;
    }

    update({ userName, position, dir, sprite, characterType }) {
        const userIndex = this._findIndex;

        this.userArray[userIndex] = { userName, position, dir, sprite, characterType };

        return this.userArray;
    }

    delete({ userName }) {
        const userIndex = this._findIndex(userName);

        this.userArray.splice(userIndex, 1);

        return this.userArray;
    }

};

