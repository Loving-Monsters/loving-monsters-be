const pool = require('../utils/pool');


module.exports = class Message {
    id;
    senderId;
    recieverId;
    text;

    constructor(row) {
        this.id = row.id;
        this.senderId = row.sender_id;
        this.recieverId = row.reciever_id;
        this.text = row.text;
    }

    static async create({ senderId, recieverId, text }) {

        const { rows } = await pool.query(`
            INSERT INTO messages
            (
                sender_id,
                reciever_id,
                text
            )
            VALUES
            ($1, $2, $3)
            RETURNING *
        `, [senderId, recieverId, text]);

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

