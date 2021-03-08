const pool = require('../utils/pool');

const startingVariables = {
    position: { x: 25, y: 375 },
    dimension: { x: 50, y: 50 },
    speed: 25,
    characterType: 'Player',
    avatar: 1,
    inventory: [],
    dir: 'down',
    passwordHash: 'passwordhash',
    friendships: [],
    idle: true,
    currentRoom: 'hallway',
    bulletinArray: [],
    messageObj: {}
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
    idle;


    constructor(row) {
        this.id = row.id;
        this.socketId = row.socketId;
        this.userName = row.user_name;
        this.inventory = row.inventory;
        this.position = row.position;
        this.speed = row.speed;
        this.dimension = row.dimension;
        this.dir = row.dir;
        this.characterType = row.character_type;
        this.avatar = row.avatar;
        this.friendships = row.friendships;
        this.currentRoom = row.currentRoom;
        this.idle = row.idle;
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
            startingVariables.friendships,
        ]);

        return {
            ...new User(rows[0]),
            socketId,
            position: startingVariables.position,
            dir: startingVariables.dir,
            idle: startingVariables.idle,
            currentRoom: startingVariables.currentRoom,
            bulletinArray: startingVariables.bulletinArray,
            messageObj: startingVariables.messageObj
        };
    }

    static async retrieve(userName, passwordHash, socketId) {

        const { rows } = await pool.query(`
        SELECT * FROM users
        WHERE user_name = $1
        AND password_hash = $2
        `, [userName, passwordHash]);

        if (rows.length === 0) return null;

        return {
            ...new User(rows[0]),
            socketId,
            position: startingVariables.position,
            dir: startingVariables.dir,
            currentRoom: startingVariables.currentRoom,
            bulletinArray: startingVariables.bulletinArray,
            messageObj: startingVariables.messageObj
        };
    }

    static async update({ id, inventory, friendships, socketId, currentRoom, position, dir, idle }) {
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
            currentRoom,
            idle
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


