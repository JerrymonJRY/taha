const express =require('express');
const router =express.Router();

const {todayOrder,totalOrder,todaynotpaidsales} =require('../controller/dashboardController');

router.get('/todayorder',todayOrder);
router.get('/totalorder',totalOrder);
router.get('/todaynotpaidsales',todaynotpaidsales);

module.exports =router;