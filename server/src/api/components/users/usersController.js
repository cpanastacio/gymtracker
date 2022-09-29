const userDAL = require('./usersDAL');


/**
 * Responsible for creating a new user on the system
 * @param {Object} req - Request object
 * @param {Object} req.body - Body of the request
 * @param {Object} res - Response Object
 * @returns 
 */
async function addUser(req, res) {
    try {
        const result = await userDAL.insert(req.body)
        return res.json(result);
    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
}

module.exports = {
    addUser
}
