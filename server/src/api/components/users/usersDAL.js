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
  const queryText = `INSERT INTO users(${Object.keys(user)}) VALUES (${amountParams})`;
  const queryValues = Object.values(user);
  const result = await db.query(queryText, queryValues);
  return result.rowCount;
}

/**
 * Responsible for fetching an user by its userId
 * @param {Number} userId - Number with the user's id
 * @returns 
 */
async function getUserById(userId) {
  const queryText = `Select * from users where user_id = $1`;
  const queryValues = [userId];
  const result = await db.query(queryText, queryValues);
  return result.rows[0];
}

/**
 * Responsible for login an user by its username and password
 * @param {String} username - User's username
 * @param {String} password - User's password
 * @returns 
 */
async function login(username, password) {
  let passwordDecrypt = false;
  const queryText = `Select * from users where username = $1`;
  const queryValues = [username];
  const userFound = await db.query(queryText, queryValues);
  if (userFound.rows.length > 0) {
    passwordDecrypt = await bcrypt.compare(password, userFound.rows[0].password);
  }
  if (userFound.rows.length === 0 || !passwordDecrypt) {
    throw new Error('Wrong credentials');
  }
  return userFound.rows[0];
}


async function getUser(username, password) {

  const queryText = `SELECT * from lifts_schema.users where password = $1 and username = $2`;
  const queryValues = [passwordDecrypt, username];
  const result = await db.query(queryText, queryValues);


}

module.exports = {
  insert,
  getUserById,
  login,
  getUser
};
