const User = require('../models/User');
const bcrypt = require('bcrypt');

async function loginUser(username, password) {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Invalid password');
    }

    return user;
}

module.exports = {
    loginUser
};
