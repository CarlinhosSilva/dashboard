const authService = require('../services/authService');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const token = await authService.register(name, email, password);
        if (token){
            res.status(201).json({ message: 'Cadastro Realizado Com Sucesso' });
        }
        else{
            res.status(400).json({ message: 'Usuário Não Encontrado!' });
        }
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.login(email, password);
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
};
