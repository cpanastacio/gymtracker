const bcrypt = require('bcrypt');

async function insert(req, res) {
  const { username, firstName, lastName, age, gender, password } = req.body;
  const SALT_ROUNDS = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = {
      username,
      password: hashedPassword,
      firstName,
      lastName,
      age,
      gender,
    };

    return res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).json({ message: error.writeErrors[0].errmsg });
    }
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  insert,
};
