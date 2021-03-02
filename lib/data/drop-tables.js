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
        console.log(' drop tables complete');

        await pool.end();
    }
    catch (err) {
        console.log(err);
        await pool.end();
    }
}

