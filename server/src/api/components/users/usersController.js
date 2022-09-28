const userDAL = require('./usersDAL');

async function addUser(req, res) {
    const { username, firstName, lastName, birthday, gender, password, height, weight, email } = req.body;
    const user = {
        username,
        password,
        firstName,
        lastName,
        birthday,
        gender,
        height,
        weight,
        email
    };
    const teste = await userDAL.insert(user)
    console.log(teste);

    return res.json(user);

}

module.exports = {
    addUser
}
