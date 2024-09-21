const taskRepository = require('../../repositories/tasksRepository');
const taskService = require('../../services/taskService');

// Mock do repositório
jest.mock('../../repositories/tasksRepository');

describe('Task Service', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa mocks antes de cada teste
    });

    describe('createTask', () => {
        it('Deve lançar erro se os dados necessários não forem informados', async () => {
            await expect(taskService.createTask(null))
                .rejects
                .toThrow('dados necessários não foram informados.');
        });

        it('Deve lançar erro se faltarem dados necessários', async () => {
            const incompleteData = { value: 100, startDate: new Date() }; // Faltam 'endDate' e 'name'
            await expect(taskService.createTask(incompleteData))
                .rejects
                .toThrow('estão faltando dados necessários para o cadastro.');
        });

        it('Deve lançar erro se a tarefa já estiver cadastrada', async () => {
            const taskData = { value: 100, startDate: new Date(), endDate: new Date(), name: 'Test Task' };
            taskRepository.findOneTask.mockResolvedValue(taskData); // Simula que a tarefa já existe

            await expect(taskService.createTask(taskData))
                .rejects
                .toThrow('Tarefa Já Cadastrada!');
        });

        it('Deve criar uma nova tarefa', async () => {
            const taskData = { value: 100, startDate: new Date(), endDate: new Date(), name: 'Test Task' };
            taskRepository.findOneTask.mockResolvedValue(null); // Simula que a tarefa não existe
            taskRepository.createTask.mockResolvedValue(taskData); // Simula a criação da tarefa

            const result = await taskService.createTask(taskData);
            expect(result).toEqual(taskData); // Verifica se a tarefa criada é a esperada
        });
    });

    describe('findTasks', () => {
        it('Deve retornar todas as tarefas', async () => {
            const mockTasks = [{ value: 100, startDate: new Date(), endDate: new Date(), name: 'Test Task' }];
            taskRepository.findTasks.mockResolvedValue(mockTasks);

            const result = await taskService.findTasks({});
            expect(result).toEqual(mockTasks); // Verifica se as tarefas retornadas são as esperadas
        });
    });
});
