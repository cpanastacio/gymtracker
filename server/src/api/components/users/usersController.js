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
 * Responsible for deleting a user by id, only if the user logged in is himself
 * @param {Object} req - Request object
 * @param {Object} req.params - Params of the request
 * @param {Object} req.session - Session
 * @param {Object} res - Response Object
 * @returns 
 */
async function deleteById(req, res) {
    const userId = parseInt(req.params.id);
    const userIdSession = req.session.user.user_id
    if (userIdSession !== userId)
        return res.status(403).json({ error: "Cant't delete user" })
    try {
        const result = await userDAL.deleteById(userId)
        return res.json(result);
    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
}

module.exports = {
    insert,
    deleteById
}
