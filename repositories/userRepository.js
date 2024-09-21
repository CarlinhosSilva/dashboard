const User = require('../models/userModel');

const findByEmail = async (email) => {
    return await User.findOne({ email });
};

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

module.exports = {
    findByEmail,
    createUser,
};
