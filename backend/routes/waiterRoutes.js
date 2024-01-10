const express =require('express');
const router =express.Router();

const {createWaiter,getallWaiter,getWaiter,updateWaiter,deleteWaiter} =require('../controller/waiterController');

router.post('/createwaiter',createWaiter);
router.get('/allwaiter',getallWaiter);
router.get('/getwaiter/:id',getWaiter);
router.put('/updatewaiter/:id',updateWaiter);
router.delete('/deletewaiter/:id',deleteWaiter);

module.exports =router;