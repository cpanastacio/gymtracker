const router = require('express').Router();
const session = require('express-session');
const { randomUUID } = require('crypto');

const user = require('./components/users/usersController');
const userDAL = require('./components/users/usersDAL');

const validator = require('./middleware/validator');
const authenticator = require('./middleware/authenticator');
const schema = require('./components/users/usersSchema');


const fiveDays = (1000 * 60 * 60 * 24) * 5;

router.use(
    session({
        genid: () => randomUUID(),
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        cookie: { maxAge: fiveDays },
        resave: false
    }));

let sessionData;

/**
 * Responsible for creating a session with the user's username and password
 */
router.post('/authenticate', validator(schema.login), async (req, res) => {
    sessionData = req.session;
    sessionData.user = {};
    const { username, password } = req.body;
    try {
        const result = await userDAL.login(username, password);
        sessionData.user = result;
        return res.send(sessionData.user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

/**
 * Responsible for fetching a user's session
 */
router.get('/get_session', authenticator, async (req, res) => {
    sessionData = req.session;
    const userData = await userDAL.getUserById(sessionData.user.user_id);
    return res.status(200).json(userData)
});

/**
 * Resposible for destroying the session
 */
router.get('/logout', authenticator, async (req, res) => {
    sessionData = req.session;
    sessionData.destroy((err) => {
        if (err) {
            return res.json({ message: 'Error destroying session' });
        }
        return res.json({ message: 'Session destroyed successfully' });
    });
})

router.post('/user', validator(schema.register), user.insert);

module.exports = router;
