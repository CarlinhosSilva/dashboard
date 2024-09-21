const Task = require('../models/tasksModel');

const findOneTask = async (startDate,endDate,name) => {
    return await Task.findOne({ startDate,endDate,name });
};

const findTasks = async (taskData) => {
    let tasks = [];

    if (!taskData || (!taskData.startDate && !taskData.endDate)) {
        tasks = await Task.find(); 
    } else {
        const query = {};

        if (taskData.startDate) {
            query.startDate = { $gte: taskData.startDate }; 
        }
        if (taskData.endDate) {
            query.endDate = { $lte: taskData.endDate }; 
        }
        if (taskData.name) {
            query.name = taskData.name; 
        }

        tasks = await Task.find(query); 
    }

    return tasks; 
}


const createTask = async (taskData) => {
    const task = new Task(taskData);
    return await task.save();
};

module.exports = {
    findOneTask,
    findTasks,
    createTask,
};