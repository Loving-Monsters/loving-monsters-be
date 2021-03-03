
const pool = require('../utils/pool');

module.exports = class Task {
    id;
    author_id;
    status;
    text;
    timestamp;

    constructor(row) {
        this.id = row.id;
        this.author_id = row.author_id;
        this.status = row.status;
        this.text = row.text;
        this.timestamp = row.timestamp;
    }

    static async create({ authorId, text, roomName }) {
        const timestamp = Date.now();

        const { rows } = await pool.query(`
        INSERT INTO tasks
        (
            author_id,
            text,
            timestamp,
            status,
            room_name
        )
        VALUES
        ($1, $2, $3, $4)
        RETURNING *
        `, [authorId, text, timestamp, 'incomplete', roomName]);

        return new Task(rows[0]);
    }

    static async findByRoom(roomName) {

        const { rows } = await pool.query(`
        SELECT * FROM tasks
        WHERE room_name = $1
        ORDER BY timestamp DESC
        `, [roomName]);

        return rows.map(task => new Task(task));
    }

    static async update({ id, text, status }) {

        const { rows } = await pool.query(`
        UPDATE tasks SET 
            text = $1,
            status = $2
        WHERE id = $3
        RETURNING *
        `, [text, status, id]);

        return new Task(rows[0]);
    }



};
