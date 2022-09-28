const router = require('express').Router();

const user = require('./components/users/usersController');
const validator = require('./middleware/validator');
const schema = require('./components/users/usersSchema');

router.post('/user', validator(schema.register), user.addUser);

module.exports = router;
