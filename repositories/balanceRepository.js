const Balance = require('../models/balanceModel');

const findOneBalance = async (month,year,name) => {
    return await Balance.findOne({ month,year,name });
};

const findBalances = async (balanceData) => {
    let balances = [];

    if (!balanceData || (!balanceData.month && !balanceData.year)) {
        balances = await Balance.find(); 
    } else {
        const query = {};

        if (balanceData.month) {
            query.month = balanceData.month; 
        }
        if (balanceData.year) {
            query.year = balanceData.year; 
        }
        if (balanceData.name) {
            query.name = balanceData.name; 
        }

        balances = await Balance.find(query); 
    }

    return balances; 
}


const createBalance = async (balanceData) => {
    const balance = new Balance(balanceData);
    return await balance.save();
};

module.exports = {
    findOneBalance,
    findBalances,
    createBalance,
};