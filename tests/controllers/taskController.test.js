const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const taskRoutes = require('../../routes/taskRoutes'); // Ajuste conforme necessário
const taskService = require('../../services/taskService');

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

// Mock do taskService
jest.mock('../../services/taskService');

// Função auxiliar para gerar um token JWT
const generateToken = () => {
    const user = { userId: 1 }; // Payload do token
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

describe('Task Controller', () => {
    describe('POST /createTask', () => {
        it('Deve criar uma nova tarefa e retornar 201', async () => {
            const mockTask = { id: '1', name: 'Nova Tarefa', value: 100 };
            taskService.createTask.mockResolvedValue(mockTask);

            const token = generateToken(); // Gera o token JWT

            const res = await request(app)
                .post('/api/tasks/createTask')
                .set('Authorization', `Bearer ${token}`) // Envia o token no header
                .send({ name: 'Nova Tarefa', value: 100, startDate: new Date(), endDate: new Date(), completed: false });

            expect(res.statusCode).toBe(201);
            expect(res.body.task).toEqual(mockTask);
        });

        it('Deve retornar 400 em caso de erro', async () => {
            taskService.createTask.mockRejectedValue(new Error('Erro ao criar tarefa'));

            const token = generateToken();

            const res = await request(app)
                .post('/api/tasks/createTask')
                .set('Authorization', `Bearer ${token}`) // Envia o token no header
                .send({ name: 'Nova Tarefa', value: 100, startDate: new Date(), endDate: new Date(), completed: false });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Erro ao criar tarefa');
        });
    });

    describe('POST /findTasks', () => {
        it('Deve encontrar tarefas e retornar 200', async () => {
            const mockTasks = [{ id: '1', name: 'Tarefa 1', value: 100 }];
            taskService.findTasks.mockResolvedValue(mockTasks);

            const token = generateToken();

            const res = await request(app)
                .post('/api/tasks/findTasks')
                .set('Authorization', `Bearer ${token}`) // Envia o token no header
                .send({ /* dados para busca */ });

            expect(res.statusCode).toBe(200);
            expect(res.body.task).toEqual(mockTasks);
        });

        it('Deve retornar 400 em caso de erro', async () => {
            taskService.findTasks.mockRejectedValue(new Error('Erro ao encontrar tarefas'));

            const token = generateToken();

            const res = await request(app)
                .post('/api/tasks/findTasks')
                .set('Authorization', `Bearer ${token}`) // Envia o token no header
                .send({ /* dados para busca */ });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Erro ao encontrar tarefas');
        });
    });

    describe('POST /findOneTask', () => {
        it('Deve encontrar uma tarefa específica e retornar 200', async () => {
            const mockTask = { id: '1', name: 'Tarefa Específica', value: 100 };
            taskService.findTasks.mockResolvedValue(mockTask);

            const token = generateToken();

            const res = await request(app)
                .post('/api/tasks/findOneTask')
                .set('Authorization', `Bearer ${token}`) // Envia o token no header
                .send({ startDate: new Date(), endDate: new Date(), name: 'Tarefa Específica' });

            expect(res.statusCode).toBe(200);
            expect(res.body.task).toEqual(mockTask);
        });

        it('Deve retornar 400 em caso de erro', async () => {
            taskService.findTasks.mockRejectedValue(new Error('Erro ao encontrar tarefa'));

            const token = generateToken();

            const res = await request(app)
                .post('/api/tasks/findOneTask')
                .set('Authorization', `Bearer ${token}`) // Envia o token no header
                .send({ startDate: new Date(), endDate: new Date(), name: 'Tarefa Específica' });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Erro ao encontrar tarefa');
        });
    });
});
