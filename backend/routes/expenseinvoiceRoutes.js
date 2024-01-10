const express =require('express');
const router =express.Router();

const {getexpensecategory,createinvexpense,viewexpenseinvoivce,editexpenseinvoice,updateExpenseinvoice,deleteExpenseinvoice} =require('../controller/expenseinvoiceController');

router.get('/getexpensecategory',getexpensecategory);
router.post('/createInvoiceexpense',createinvexpense);
router.get('/allexpenseinvoice',viewexpenseinvoivce);
router.get('/editexpenseinvoice/:id',editexpenseinvoice);
router.put('/updateexpensiveinvoice/:id',updateExpenseinvoice);
router.put('/deleteexpenseinvoice/:id',deleteExpenseinvoice);


module.exports =router;