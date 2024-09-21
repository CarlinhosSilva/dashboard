const mongoose = require('mongoose');

const BalanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    month: {
        type: Number, 
        required: true,
    },
    year: {
        type: Number, 
        required: true,
    },
    balance: {
        type: Number,
    },
    completed: {
        type: Boolean,
    },
    tasksCompleted: {
        type: Number,
    },
    tasksPending: {
        type: Number,
    },
    tasksNotCompleted: {
        type: Number,
    },
    createdAt: {
        type: Date, 
        default: Date.now, 
    }
});

const Balance = mongoose.model('Balance', BalanceSchema); 
module.exports = Balance;
