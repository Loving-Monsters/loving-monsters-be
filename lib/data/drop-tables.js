require('dotenv').config();
const client = require('../utils/pool');

run();

async function run() {
    try {
        await client.connect();

        await client.query(`
            DROP TABLE IF EXISTS users CASCADE;
            DROP TABLE IF EXISTS tasks CASCADE;
            DROP TABLE IF EXISTS messages CASCADE;
        `);
        console.log(' drop tables complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }

}

