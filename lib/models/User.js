const pool = require('../utils/pool');

const startingVariables = {
    position: { x: 50, y: 50 },
    dimension: { x: 50, y: 50 },
    speed: 50,
    characterType: 'Player',
    avatar: 1,
    inventory: [],
    dir: 'down',
    passwordHash: 'passwordhash',
    friendships: []
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
    currentRoom;

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
        this.friendships = row.friendships;
        this.currentRoom = row.currentRoom;
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
                avatar,
                friendships
            )
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `, [
            `player ${randomNumber}`,
            startingVariables.passwordHash,
            startingVariables.inventory,
            startingVariables.speed,
            startingVariables.dimension,
            startingVariables.characterType,
            startingVariables.avatar,
            startingVariables.friendships
        ]);

        return {
            ...new User(rows[0]),
            socketId,
            position: startingVariables.position,
            dir: startingVariables.dir,
            currentRoom: 'hall'
        };
    }

    static async retrieve(userName, passwordHash, socketId) {

        const { rows } = await pool.query(`
        SELECT * FROM users
        WHERE user_name = $1
        AND password_hash = $2
        `, [userName, passwordHash]);

        return {
            ...new User(rows[0]),
            socketId,
            position: startingVariables.position,
            dir: startingVariables.dir,
            currentRoom: 'hall'
        };
    }

    static async update({ id, inventory, friendships, socketId, currentRoom, position, dir }) {
        const { rows } = await pool.query(`
        UPDATE users SET 
            inventory = $1,
            friendships = $2
        WHERE id = $3
        RETURNING *
        `, [id, inventory, friendships]);

        return {
            ...new User(rows[0]),
            socketId,
            position,
            dir,
            currentRoom
        };
    }

    static async delete(id) {
        const { rows } = await pool.query(`
        DELETE users 
        WHERE id = $1
        RETURNING *
        `, [id]);

        return new User(rows[0]);
    }

};


