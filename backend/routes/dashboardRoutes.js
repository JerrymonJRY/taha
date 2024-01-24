const express =require('express');
const router =express.Router();

const {todayOrder,totalOrder,todaypaidsales} =require('../controller/dashboardController');

router.get('/todayorder',todayOrder);
router.get('/totalorder',totalOrder);
router.get('/todaypaidsales',todaypaidsales);

module.exports =router;