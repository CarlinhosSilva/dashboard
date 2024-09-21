const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
    },
    value: {
        type: Number, 
        required: true,
    },
    startDate: {
        type: Date, 
        required: true,
    },
    endDate: {
        type: Date, 
        required: true,
    },
    completed: {
        type: Boolean,
    },
    createdAt: {
        type: Date, 
        default: Date.now, 
    }
});

const Task = mongoose.model('Task', taskSchema); 
module.exports = Task;
