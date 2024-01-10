const express =require('express');
const router =express.Router();


const {createBalance, checkBalance} =require('../controller/openningbalanceController');


router.post('/create',createBalance);
router.get('/opennigbalance',checkBalance);

module.exports =router;