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

/**
 * Responsible for querying the database
 * @param {String} queryText - Sql statement
 * @param {String} queryValues - Values to be used on the sql statement
 * @returns 
 */
async function query(queryText, queryValues) {
    const client = await pool.connect();
    const schema = "SET search_path TO 'lifts_schema';";
    try {
        const sql = concatQueryWithValues(queryText, queryValues)
        await client.query(schema);
        return await client.query(sql);
    } catch (e) {
        throw Error(e.message)
    } finally {
        client.release()
    }
}

/**
 * Responsible for formatting the sql statement
 * @param {String} queryText - Sql statement
 * @param {String} queryValues - Values to be used on the sql statement
 * @returns 
 */
function concatQueryWithValues(queryText, queryValues) {
    let text = queryText;
    for (let i = 0; i < queryValues.length; i++) {
        const value = queryValues[i];
        text = text.replace(`$${i + 1}`, `'${value}'`);
    }
    return text;
}

function getSQLPlaceholders(amount) {
    let s = '';
    for (let a = 1; a <= amount; a++) {
        s += '$' + a + ', ';
    }
    if (s) {
        s = s.substring(0, s.length - 2);
    }
    return s;
};

module.exports = {
    getSQLPlaceholders,
    query
}
