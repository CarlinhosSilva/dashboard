const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const balanceRoutes = require('../../routes/balanceRoutes');
const balanceService = require('../../services/balanceService');

const app = express();
app.use(express.json());
app.use('/api/balances', balanceRoutes);

// Mock do balanceService
jest.mock('../../services/balanceService');

// Função auxiliar para gerar um token JWT
const generateToken = () => {
    const user = { userId: 1 }; // Payload do token
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

describe('Balance Controller', () => {
    describe('POST /createBalance', () => {
        it('Deve criar um novo saldo e retornar 201', async () => {
            const mockBalance = { name: 'Teste', month: 10, year: 2024 };
            balanceService.createBalance.mockResolvedValue(mockBalance);

            const token = generateToken(); // Gera o token JWT

            const res = await request(app)
                .post('/api/balances/createBalance')
                .set('Authorization', `Bearer ${token}`) // Envia o token no header
                .send({ name: 'Teste', month: 10, year: 2024 });

            expect(res.statusCode).toBe(201);
            expect(res.body.balance).toEqual(mockBalance);
        });

        it('Deve retornar 400 em caso de erro', async () => {
            balanceService.createBalance.mockRejectedValue(new Error('Erro ao criar saldo'));

            const token = generateToken();

            const res = await request(app)
                .post('/api/balances/createBalance')
                .set('Authorization', `Bearer ${token}`) // Envia o token no header
                .send({ name: 'Teste', value: 100 });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Erro ao criar saldo');
        });
    });

    describe('POST /findBalances', () => {
        it('Deve encontrar saldos e retornar 200', async () => {
            const mockBalances = [{ id: '1', name: 'Teste', value: 100 }];
            balanceService.findBalances.mockResolvedValue(mockBalances);

            const token = generateToken();

            const res = await request(app)
                .post('/api/balances/findBalances')
                .set('Authorization', `Bearer ${token}`) // Envia o token no header
                .send({ /* dados para busca */ });

            expect(res.statusCode).toBe(200);
            expect(res.body.balance).toEqual(mockBalances);
        });

        it('Deve retornar 400 em caso de erro', async () => {
            balanceService.findBalances.mockRejectedValue(new Error('Erro ao encontrar saldos'));

            const token = generateToken();

            const res = await request(app)
                .post('/api/balances/findBalances')
                .set('Authorization', `Bearer ${token}`) // Envia o token no header
                .send({ /* dados para busca */ });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Erro ao encontrar saldos');
        });
    });

    describe('POST /findOneBalance', () => {
        it('Deve encontrar um saldo específico e retornar 200', async () => {
            const mockBalance = { name: 'Teste', month: 9, year: 2023 };
            balanceService.findBalances.mockResolvedValue(mockBalance);

            const token = generateToken();

            const res = await request(app)
                .post('/api/balances/findOneBalance')
                .set('Authorization', `Bearer ${token}`) // Envia o token no header
                .send({ name: 'Teste', month: 9, year: 2023 });
            expect(res.statusCode).toBe(200);
            expect(res.body.balance).toEqual(mockBalance);
        });

        it('Deve retornar 400 em caso de erro', async () => {
            balanceService.findBalances.mockRejectedValue(new Error('Erro ao encontrar saldo'));

            const token = generateToken();

            const res = await request(app)
                .post('/api/balances/findOneBalance')
                .set('Authorization', `Bearer ${token}`) // Envia o token no header
                .send({ month: 9, year: 2023, name: 'Teste' });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Erro ao encontrar saldo');
        });
    });
});
