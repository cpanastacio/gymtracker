const bcrypt = require('bcrypt');
const db = require('../utils/query');

/**
 * Responsible for Inserting a new user in the system
 * @param {Object} user - Object with the user data
 * @returns 
 */
async function insert(user) {
  delete user.confirmPassword;
  const SALT_ROUNDS = 10;
  user.password = hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  const amountParams = db.getSQLPlaceholders(Object.keys(user).length);
  const queryText = `INSERT INTO lifts_schema.users(${Object.keys(user)}) VALUES (${amountParams})`;
  const queryValues = Object.values(user);
  const result = await db.query(queryText, queryValues);
  return result.rowCount;
}

module.exports = {
  insert,
};
