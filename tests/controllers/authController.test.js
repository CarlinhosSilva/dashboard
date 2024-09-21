const request = require('supertest');
const express = require('express');
const authRoutes = require('../../routes/authRoutes');
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

// Simulação de um banco de dados em memória
let users = [];

// Middleware para simulação do registro de usuários
app.post('/api/auth/register', (req, res) => {
  const { email } = req.body;
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }

  const newUser = { ...req.body, token: 'fake-token' }; // Simula um token
  users.push(newUser);
  return res.status(201).json(newUser);
});

describe('AuthController - /api/auth', () => {
  beforeEach(() => {
    // Limpa a lista de usuários antes de cada teste
    users = [];
  });

  it('Deve retornar erro 400 se o email já estiver cadastrado', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'Teste', email: 'teste@example.com', password: '123456' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Teste Duplicado', email: 'teste@example.com', password: '123456' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email já cadastrado');
  });

  it('Deve registrar usuário com sucesso', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Novo Usuário', email: 'novo@example.com', password: '123456' });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });
});
