const pool = require('../utils/pool');

const startingVariables = {
    position: { x: 50, y: 50 },
    dimension: { x: 50, y: 50 },
    speed: 50,
    characterType: 'Player',
    avatar: 1,
    inventory: [],
    dir: 'down',
    passwordHash: 'passwordhash'
};


module.exports = class User {
    id;
    socketId;
    userName;
    inventory;
    position;
    speed;
    dimension;
    dir;
    characterType;
    avatar;

    constructor(row) {
        this.id = row.id;
        this.socketId = row.socketId;
        this.userName = row.user_name;
        this.inventory = row.inventory;
        this.position = row.position;
        this.speed = row.speed;
        this.dimension = row.speed;
        this.dir = row.dir;
        this.characterType = row.character_type;
        this.avatar = row.avatar;
    }

    static async create(socketId) {

        const randomNumber = Math.floor(Math.random() * 10);

        const { rows } = await pool.query(`
            INSERT INTO users
            (
                user_name,
                password_hash,
                inventory,
                speed,
                dimension,
                character_type,
                avatar
            )
            VALUES
            ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `, [
            `player ${randomNumber}`,
            startingVariables.passwordHash,
            startingVariables.inventory,
            startingVariables.speed,
            startingVariables.dimension,
            startingVariables.characterType,
            startingVariables.avatar
        ]);
        // console.log('rows');
        // console.log(rows[0]);

        return {
            ...new User(rows[0]),
            socketId,
            position: startingVariables.position,
            dir: startingVariables.dir
        };
    }

    static async retrieve(userId) {


    }

};


