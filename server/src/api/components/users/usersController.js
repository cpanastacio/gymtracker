const userDAL = require('./usersDAL');


/**
 * Responsible for creating a new user on the system
 * @param {Object} req - Request object
 * @param {Object} req.body - Body of the request
 * @param {Object} res - Response Object
 * @returns 
 */
async function insert(req, res) {
    try {
        const result = await userDAL.insert(req.body)
        return res.json(result);
    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
}

/**
 * Responsible for fetching user's info using his password and username
 * @param {Object} req - Request object
 * @param {Object} req.body - Body of the request
 * @param {Object} res - Response Object
 * @returns 
 */
async function getUser(req, res) {
    const { password, username } = req.body;
    try {
        const result = await userDAL.getUser(password, username)
        return res.json(result);
    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
}

module.exports = {
    insert,
    getUser
}
