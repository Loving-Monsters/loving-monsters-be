const client = require('../lib/client')


run();

async function run() {
    try {
        await client.connect();

        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                user_name TEXT NOT NULL,
                password_hash TEXT,
                inventory text[],
                speed INTEGER,
                dimension json,
                character_type TEXT,
                sprite INTEGER
            );
        
            CREATE TABLE tasks (
                id SERIAL PRIMARY KEY,
                author_id INTEGER,
                text TEXT,
                creation_date TEXT
            );
        `)
    }
}
