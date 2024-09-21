const authService = require('../../services/authService');
const userRepository = require('../../repositories/userRepository');

// Mock do repositório para simular respostas
jest.mock('../../repositories/userRepository');

describe('AuthService - Register', () => {
  beforeAll(() => {
    console.log('Executando testes em authService.test.js');
  });

  it('Deve lançar erro se o email já estiver cadastrado', async () => {
    // Simula que o email já está cadastrado
    userRepository.findByEmail.mockResolvedValue({ email: 'teste@example.com' });

    await expect(authService.register('Teste', 'teste@example.com', '123456'))
      .rejects
      .toThrow('Email já cadastrado'); // Verifica apenas a mensagem
  });

  it('Deve registrar um novo usuário com sucesso', async () => {
    // Simula que o email não está cadastrado
    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.createUser.mockResolvedValue({ _id: '123', name: 'Teste', email: 'teste@example.com' });

    const token = await authService.register('Teste', 'teste@example.com', '123456');
    expect(token).toBeDefined(); // Verifica se o token foi gerado
  });
});
