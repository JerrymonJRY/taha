const express =require('express');
const router =express.Router();

const {createCustomer,getallCustomer,getCustomer,updateCustomer,deleteCustomer} =require('../controller/customerController');

router.post('/createCustomer',createCustomer);
router.get('/allCustomer',getallCustomer);
router.get('/getCustomer/:id',getCustomer);
router.put('/updateCustomer/:id',updateCustomer);
router.delete('/deleteCustomer/:id',deleteCustomer);

module.exports =router;