const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const register = async (name, email, password) => {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        throw new Error('Email já cadastrado');
    }

    const user = await userRepository.createUser({ name, email, password });
    return generateToken(user._id);
};

const login = async (email, password) => {
    const user = await userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Credenciais inválidas');
    }
    user.token = generateToken(user._id); 
    returnUser = {name: user.name, token: user.token}
    return returnUser;
};

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
    register,
    login,
};
