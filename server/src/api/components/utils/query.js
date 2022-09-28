require('dotenv').config()
const Pool = require('pg').Pool

const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}

const pool = new Pool(config)

module.exports = async function (queryText, queryValues) {
    const client = await pool.connect();
    try {
        return await client.query(queryText, queryValues);
    } catch (e) {
        return { error: e.stack }
    } finally {
        client.release()
    }
}
