const balanceRepository = require('../repositories/balanceRepository');

const createBalance = async (data) => {
    
    if (!data) {
        throw new Error('dados necessários não foram informados.');
    }
    else if(!data.month || !data.year || !data.name){
        throw new Error('estão faltando dados necessários para o cadastro.');   
    }

    const existingBalance = await balanceRepository.findOneBalance(data.month,data.year,data.name);
    if (existingBalance) {
        throw new Error('O balanço do mês/ano ' + data.month + "/" + data.year + 'já existe!');
    }

    const balance = await balanceRepository.createBalance({ data });
    return balance;
};

const findBalances = async (data) => {
    const balance = await balanceRepository.findBalances({ data });
    return balance;
};


module.exports = {
    createBalance,
    findBalances,
};
