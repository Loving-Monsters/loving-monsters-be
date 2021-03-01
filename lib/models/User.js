

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
    sprite;

    constructor(row) {
        this.id = row.id;
        this.socketId = row.socketId;
        this.userName = row.userName;
        this.passwordHash = row.passwordHash;
        this.inventory = row.inventory;
        this.position = row.position;
        this.speed = row.speed;
        this.dimension = row.dimension;
        this.dir = row.dir;
        this.characterType = row.characterType;
        this.sprite = row.sprite;
    }

    static async create(socketId) {
        const randomNumber = Math.floor(Math.random() * 10);
        return {
            row: {
                id: 1,
                socketId,
                userName: `player${randomNumber}`,
                passwordHash: 'pass',
                inventory: [],
                position: { x: 50, y: 100 },
                speed: 50,
                dimension: { x: 50, y: 50 },
                dir: 'DOWN',
                characterType: 'PLAYER',
                sprite: 1
            }
        };
    }
};

