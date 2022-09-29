/**
 * Responsible for validating the authentication
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Passes control to the next matching route
 * @returns 
 */
module.exports = function (req, res, next) {
    console.log(typeof (next));
    const { user } = req.session;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return next();
}
