require('dotenv').config();
const pool = require('../utils/pool');

run();

async function run() {
    try {
        await pool.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                user_name TEXT NOT NULL,
                password_hash TEXT,
                inventory text[],
                speed INTEGER,
                dimension json,
                character_type TEXT,
                avatar INTEGER
            );

            CREATE TABLE tasks (
                id SERIAL PRIMARY KEY,
                author_id INTEGER,
                text TEXT,
                creation_date TEXT
            );
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
