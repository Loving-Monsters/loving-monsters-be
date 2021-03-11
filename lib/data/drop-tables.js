require('dotenv').config();
const pool = require('../utils/pool');

run();

async function run() {
    try {
        await pool.query(`
            DROP TABLE IF EXISTS users CASCADE;
            DROP TABLE IF EXISTS tasks CASCADE;
            DROP TABLE IF EXISTS messages CASCADE;
        `);
        await pool.end();
    }
    catch(err) {
        await pool.end();
    }
}

