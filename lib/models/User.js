const pool = require('../utils/pool');
const bcrypt = require('bcryptjs');


const startingVariables = {
    position: { x: 50, y: 375 },
    dimension: { x: 50, y: 125 },
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
    messageObj: {},
    taskObj: [],
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
        this.dimension = row.dimension;
        this.dir = row.dir;
        this.characterType = row.character_type;
        this.avatar = row.avatar;
        this.friendships = row.friendships;
        this.currentRoom = row.currentRoom;
    }

    static async create(socketId, { userName, avatar, password }) {
        const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

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
            userName,
            passwordHash,
            startingVariables.inventory,
            startingVariables.speed,
            startingVariables.dimension,
            startingVariables.characterType,
            avatar,
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
            messageObj: startingVariables.messageObj,
            taskObj: startingVariables.taskObj
        };
    }

    static async retrieve(userName, password, socketId) {

        const { rows } = await pool.query(`
        SELECT * FROM users
        WHERE user_name = $1
        `, [userName]);

        if (rows.length > 0) {
            const passwordsMatch = await bcrypt.compare(password, rows[0].password_hash);

            if (passwordsMatch) {
                return {
                    ...new User(rows[0]),
                    socketId,
                    position: startingVariables.position,
                    dir: startingVariables.dir,
                    currentRoom: startingVariables.currentRoom,
                    bulletinArray: startingVariables.bulletinArray,
                    messageObj: startingVariables.messageObj,
                    taskObj: startingVariables.taskObj,
                    idle: startingVariables.idle,
                };
            }
        }
        return false;
    }

    static async findByName(nameEntry) {
        const { rows } = await pool.query(`
            SELECT id
            FROM users
            WHERE user_name = $1
        `, [nameEntry]);

        if (rows.length > 0) return true;

        return false;
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


