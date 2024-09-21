const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/createBalance',protect, balanceController.createBalance);
router.post('/findBalances',protect, balanceController.findBalances);
router.post('/findOneBalance',protect, balanceController.findOneBalance);

module.exports = router;