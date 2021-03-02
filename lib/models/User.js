

module.exports = class User {
    id;
    socketId;
    userName;
    passwordHash;
    inventory;
    position;
    speed;
    dimension;
    dir;
    characterType;
    avatar;

    constructor(socketId) {
        const randomNumber = Math.floor(Math.random() * 10);

        this.id = randomNumber;
        this.socketId = socketId;
        this.userName = `player${randomNumber}`;
        this.passwordHash = 'passwordHash';
        this.inventory = [];
        this.position = { x: 50, y: 100 };
        this.speed = 50;
        this.dimension = { x: 50, y: 50 };
        this.dir = 'down';
        this.characterType = 'PLAYER';
        this.avatar = 1;
    }

    // create(socketId) {
    //     const randomNumber = Math.floor(Math.random() * 10);
    //     return {
    //         row: {
    //             id: randomNumber,
    //             socketId,
    //             userName: `player${randomNumber}`,
    //             passwordHash: 'pass',
    //             inventory: [],
    //             position: { x: 50, y: 100 },
    //             speed: 50,
    //             dimension: { x: 50, y: 50 },
    //             dir: 'DOWN',
    //             characterType: 'PLAYER',
    //             sprite: 1
    //         }
    //     };
};


