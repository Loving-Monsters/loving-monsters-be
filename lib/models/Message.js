const pool = require('../utils/pool');


module.exports = class Message {
    id;
    senderId;
    recieverId;
    text;
    timestamp;

    constructor(row) {
        this.id = row.id;
        this.senderId = row.sender_id;
        this.recieverId = row.reciever_id;
        this.text = row.text;
        this.timestamp = row.timestamp;
    }

    static async create({ senderId, recieverId, text }) {
        const timestamp = Date.now();

        const { rows } = await pool.query(`
            INSERT INTO messages
            (
                sender_id,
                reciever_id,
                text,
                timestamp
            )
            VALUES
            ($1, $2, $3, $4)
            RETURNING *
        `, [senderId, recieverId, text, timestamp]);

        return new Message(rows[0]);
    }

    static async findMessages(userIds) {
        const { rows } = await pool.query(`
        SELECT * FROM messages
        WHERE (sender_id = $1 OR sender_id = $2)
        AND (reciever_id = $1 OR reciever_id = $2)
        ORDER BY timestamp DESC
        `, [userIds[0], userIds[1]]);

        return rows.map(row => new Message(row));
    }

    static async findByUserId(userId) {
        const { rows } = await pool.query(`
        SELECT * FROM messages
        WHERE (sender_id = $1 OR reciever_id = $1)
        ORDER BY timestamp DESC
        `, [userId]);

        if (rows.length === 0) return null;

        return new Message(rows[0]);
    }

    static async findBySenderId({ senderId }) {
        const { rows } = await pool.query(`
            SELECT * FROM messages
            WHERE sender_id = $1
        `, [senderId]);

        return rows.map(message => new Message(message));
    }

    static async findByRecieverId({ recieverId }) {
        const { rows } = await pool.query(`
            SELECT * FROM messages
            WHERE reciever_id = $1
        `, [recieverId]);

        return rows.map(message => new Message(message));
    }

    static async delete(messageId) {
        const { rows } = await pool.query(`
        DELETE FROM messages
        WHERE id = $1
        RETURNING *
        `, [messageId]);

        return new Message(rows[0]);
    }
};

