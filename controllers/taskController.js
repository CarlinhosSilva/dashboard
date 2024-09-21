const taskService = require('../services/taskService');

const createTask = async (req, res) => {
    const data = req.body;
    try {
        const task = await taskService.createTask(data);
        res.status(201).json({ task });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const findTasks = async (req, res) => {
    const data = req.body;
    try {
        const task = await taskService.findTasks(data);
        res.status(200).json({ task });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const findOneTask = async ( req, res) => {
    const {startDate,endDate,name} = req.body;
    try {
        const task = await taskService.findTasks(startDate,endDate,name);
        res.status(200).json({ task });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createTask,
    findTasks,
    findOneTask
};