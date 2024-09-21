const taskRepository = require('../repositories/tasksRepository');

const createTask = async (data) => {

    if (!data) {
        throw new Error('dados necessários não foram informados.');
    }
    else if(!data.value || !data.startDate || !data.endDate || !data.name){
        throw new Error('estão faltando dados necessários para o cadastro.');   
    }

    const existingTask = await taskRepository.findOneTask(data.value,data.startDate,data.endDate,data.name);
    if (existingTask) {
        throw new Error('Tarefa Já Cadastrada!');
    }

    const task = await taskRepository.createTask({ data });
    return task;
};

const findTasks = async (data) => {
    const tasks = await taskRepository.findTasks({ data });
    return tasks;
};


module.exports = {
    createTask,
    findTasks,
};