const express =require('express');
const router =express.Router();

const {todayOrder,totalOrder,todaypaidsales,oveallsales} =require('../controller/dashboardController');
const {monthlyGraphsales,dailyGraphSales,weeklyGraphsales,monthlyWeeklyGraphsales,dailyHighestSales,highestSales} =require('../controller/dashboardgraphController');
const {foodoptionsgraph,yearlyGraphsales} =require('../controller/dashboardReportController');

router.get('/todayorder',todayOrder);
router.get('/totalorder',totalOrder);
router.get('/todaypaidsales',todaypaidsales);
router.get('/oveallsales',oveallsales);


//Graph
router.get('/monthlygraph',monthlyGraphsales);
router.get('/dailygraph',dailyGraphSales);
router.get('/weeklygraph',weeklyGraphsales);
router.get('/monthlywiseweek',monthlyWeeklyGraphsales);
router.get('/dailyhighestsales',dailyHighestSales);
router.get('/highestSales/:period',highestSales);


//Report Controller

router.get('/foodoptionsgraph',foodoptionsgraph);
router.get('/yearlyGraphsales',yearlyGraphsales);

module.exports =router;