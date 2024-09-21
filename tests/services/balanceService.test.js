const balanceService = require('../../services/balanceService');
const balanceRepository = require('../../repositories/balanceRepository');

// Mock do repositório
jest.mock('../../repositories/balanceRepository');

describe('Balance Service', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa mocks antes de cada teste
    });

    describe('createBalance', () => {
        it('Deve lançar erro se os dados necessários não forem informados', async () => {
            await expect(balanceService.createBalance(null))
                .rejects
                .toThrow('dados necessários não foram informados.');
        });

        it('Deve lançar erro se faltarem dados necessários', async () => {
            const incompleteData = { month: 1, year: 2024 }; // Falta o 'name'
            await expect(balanceService.createBalance(incompleteData))
                .rejects
                .toThrow('estão faltando dados necessários para o cadastro.');
        });

        it('Deve lançar erro se o balanço já existir', async () => {
            const balanceData = { month: 1, year: 2024, name: 'Test Balance' };
            balanceRepository.findOneBalance.mockResolvedValue(balanceData); // Simula que o balanço já existe

            await expect(balanceService.createBalance(balanceData))
                .rejects
                .toThrow('O balanço do mês/ano 1/2024já existe!');
        });

        it('Deve criar um novo balanço', async () => {
            const balanceData = { month: 1, year: 2024, name: 'Test Balance' };
            balanceRepository.findOneBalance.mockResolvedValue(null); // Simula que o balanço não existe
            balanceRepository.createBalance.mockResolvedValue(balanceData); // Simula a criação do balanço

            const result = await balanceService.createBalance(balanceData);
            expect(result).toEqual(balanceData); // Verifica se o balanço criado é o esperado
        });
    });

    describe('findBalances', () => {
        it('Deve retornar todos os balanços', async () => {
            const mockBalances = [{ month: 1, year: 2024, name: 'Test Balance' }];
            balanceRepository.findBalances.mockResolvedValue(mockBalances);

            const result = await balanceService.findBalances({});
            expect(result).toEqual(mockBalances); // Verifica se os balanços retornados são os esperados
        });
    });
});
