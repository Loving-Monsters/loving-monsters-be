
const pool = require('../utils/pool');

module.exports = class Task {
    id;
    author_name;
    status;
    text;
    timestamp;

    constructor(row) {
        this.id = row.id;
        this.authorName = row.author_name;
        this.status = row.status;
        this.text = row.text;
        this.timestamp = row.timestamp;
    }

    static async create({ authorName, text, roomName }) {
        const timestamp = Date.now();

        const { rows } = await pool.query(`
        INSERT INTO tasks
        (
            author_name,
            text,
            timestamp,
            status,
            room_name
        )
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *
        `, [authorName, text, timestamp, 'todo', roomName]);

        return new Task(rows[0]);
    }

    static async findByRoom(roomName) {

        const { rows } = await pool.query(`
        SELECT * FROM tasks
        WHERE room_name = $1
        ORDER BY timestamp DESC
        `, [roomName]);

        const returnObject = {
            todo: [],
            inProgress: [],
            completed: []
        };


        rows.forEach(task => returnObject[task.status].push(new Task(task)));

        return returnObject;
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

    static async delete(id) {

        const { rows } = await pool.query(`
        DELETE FROM tasks
        WHERE id = $1
        RETURNING *
        `, [id]);


        return new Task(rows[0]);
    }



};
