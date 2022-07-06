const router = require('express').Router();

const user = require('./components/userController');

router.post('/user', user.insert);

module.exports = router;
