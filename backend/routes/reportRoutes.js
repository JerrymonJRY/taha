const express =require('express');
const router =express.Router();

const {deliveryReports, 
    deliveryPerson, 
    customerReports, 
    getCustomer, 
    waiterReport, 
    getWaiter} =require('../controller/reportController');

//DElivery Boy Reports
router.get('/deliveryreports',deliveryReports);
router.get('/deliveryperson',deliveryPerson);
//Customer Details Report
router.get('/customerreports',customerReports);
router.get('/getcustomer',getCustomer);
//Waiter Details Report
router.get('/waiterreports',waiterReport);
router.get('/getwaiter',getWaiter);


module.exports =router;