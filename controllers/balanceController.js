const balanceService = require('../services/balanceService');

const createBalance = async (req, res) => {
    const data = req.body;
    try {
        const balance = await balanceService.createBalance(data);
        res.status(201).json({ balance });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const findBalances = async (req, res) => {
    const data = req.body;
    try {
        const balance = await balanceService.findBalances(data);
        res.status(200).json({ balance });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const findOneBalance = async ( req, res) => {
    const {month,year,name} = req.body;
    try {
        const balance = await balanceService.findBalances(month,year,name);
        res.status(200).json({ balance });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createBalance,
    findBalances,
    findOneBalance,
};