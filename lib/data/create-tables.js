require('dotenv').config();
const pool = require('../utils/pool');

run();

async function run() {
    try {
        await pool.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                user_name TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                inventory text[],
                speed INTEGER,
                dimension json NOT NULL,
                character_type TEXT NOT NULL,
                avatar INTEGER NOT NULL,
                friendships text[]
            );

            CREATE TABLE tasks (
                id SERIAL PRIMARY KEY,
                author_name TEXT,
                status TEXT,
                text TEXT,
                timestamp TEXT,
                room_name TEXT
            );

            CREATE TABLE messages (
                id SERIAL PRIMARY KEY,
                sender_id INTEGER,
                sender_name TEXT,
                reciever_id INTEGER,
                reciever_name TEXT,
                timestamp BIGINT,
                text TEXT
            )
        `);
        console.log('create tables complete');
    } catch (err) {
        // problem? let's see the error...
        console.log(err);
    } finally {
        // success or failure, need to close the db connection
        pool.end();
    }
}
