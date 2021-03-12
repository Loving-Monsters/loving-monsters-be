const Ball = require('./Ball');

module.exports = class GameState {
    roomName;
    userArray;
    ballArray;
    wallArray;

    constructor(roomName, ballArray = [], wallArray = []) {
        this.userArray = [];
        this.ballArray = ballArray;
        this.roomName = roomName;
        this.wallArray = wallArray;
    }

    #findUserById(id) {
        return this.userArray.findIndex(user => user.id === id);
    }

    insert({ id, userName, position, dir, avatar, characterType, currentRoom, idle, dimension }, socketId) {
        console.log('🚀 ~ file: GameState.js ~ line 22 ~ GameState ~ insert ~ this.userArray', this.userArray['-1']);
        if (this.userArray.includes(user => user.id === id)) {
            console.log('user already exisists');
        } else {
            this.userArray.push({ id, userName, position, dir, avatar, characterType, socketId, currentRoom, idle, dimension });
            return { userArray: this.userArray, roomName: this.roomName };
        }
    }

    retrieve() {
        return this.userArray;
    }

    update({ id, userName, position, dir, avatar, characterType, socketId, idle, dimension }, roomsObj) {
        const userIndex = this.#findUserById(id);
        this.userArray[userIndex] = { id, userName, position, dir, avatar, characterType, socketId, idle, dimension };
        if (this.ballArray) {
            this.ballArray.forEach(ball => ball.userCollisionCheck(this.userArray, this.wallArray, roomsObj));
        }
        return {
            userArray: this.userArray,
            ballArray: this.ballArray,
            roomName: this.roomName
        };
    }

    delete(socketId) {
        const userIndex = this.userArray.findIndex(user => user.socketId === socketId);

        this.userArray.splice(userIndex, 1);

        return { userArray: this.userArray, roomName: this.roomName };
    }

    addBall(id, startingPosition) {
        this.ballArray.push(new Ball(id, startingPosition, this.roomName));
    }

    removeBall(ballId) {
        const ballIndex = this.ballArray.findIndex(ball => ball.id === ballId);
        this.ballArray.splice(ballIndex, 1);
    }

};

