const express =require('express');
const router =express.Router();

const { createDelivery,getallDelivery } =require('../controller/deliveryController');

router.post('/createdelivery',createDelivery);
router.get('/alldelivery',getallDelivery);


module.exports =router;