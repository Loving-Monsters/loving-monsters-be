const pool = require('../utils/pool');

module.exports = class Message {
    id;
    senderId;
    senderName;
    recieverId;
    recieverName;
    text;
    timestamp;

    constructor(row) {
        this.id = row.id;
        this.senderId = row.sender_id;
        this.senderName = row.sender_name;
        this.recieverId = row.reciever_id;
        this.recieverName = row.reciever_name;
        this.text = row.text;
        this.timestamp = row.timestamp;
    }

    static async create({ senderId, senderName, recieverId, recieverName, text }) {
        const timestamp = Date.now();

        const { rows } = await pool.query(`
            INSERT INTO messages
            (
                sender_id,
                sender_name,
                reciever_id,
                reciever_name,
                text,
                timestamp
            )
            VALUES
            ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [senderId, senderName, recieverId, recieverName, text, timestamp]);
        
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

        if(rows.length === 0) return null;

        return rows.map(message => new Message(message));
    }

    static async findBySenderId({ senderId }) {
        const { rows } = await pool.query(`
            SELECT * FROM messages
            WHERE sender_id = $1
            ORDER BY timestamp DESC
        `, [senderId]);

        return rows.map(message => new Message(message));
    }

    static async findByRecieverId({ recieverId }) {
        const { rows } = await pool.query(`
            SELECT * FROM messages
            WHERE reciever_id = $1
            ORDER BY timestamp DESC
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

    static async sortMessages(messageArray, userId) {

        const sortedObj = {};

        for(const message of messageArray) {

            const { senderId, senderName, recieverId, recieverName } = message;

            if(senderId === userId && sortedObj[recieverName]) {
                sortedObj[recieverName].push(message);
            } else if(senderId === userId) {
                sortedObj[recieverName] = [message];
            } else if(recieverId === userId && sortedObj[senderName]) {
                sortedObj[senderName].push(message);
            } else {
                sortedObj[senderName] = [message];
            }
        }
        return sortedObj;
    }
};

