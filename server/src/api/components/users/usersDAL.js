const bcrypt = require('bcrypt');
const query = require('../utils/query');

async function insert(user) {
  try {
    const SALT_ROUNDS = 10;
    user.password = hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    const queryText = `INSERT INTO "lifts_schema.users" ("username", "password", firstName, lastName, birthday, gender, height, weight, email, created_on)`;
    const queryValues = [user];
    const x = await query(queryText, queryValues)
    console.log(x);
  } catch (error) {
    return { error: error.stack }
  }
}

module.exports = {
  insert,
};
