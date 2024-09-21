const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/createTask',protect, taskController.createTask);
router.post('/findTasks',protect, taskController.findTasks);
router.post('/findOneTask',protect, taskController.findOneTask);

module.exports = router;
