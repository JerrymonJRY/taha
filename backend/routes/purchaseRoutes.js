const express =require('express');
const router =express.Router();

const {getSupplier,getIngredient,ctratePurchase,allInvoice,editPurchase,expiryDate,updatepurchase} =require('../controller/purchaseController');

router.get('/getSupplier',getSupplier);
router.get('/getIngredient',getIngredient);
router.post('/create',ctratePurchase);
router.get('/all',allInvoice);
router.get('/edit/:id',editPurchase);
router.get('/getexpiry',expiryDate);
router.put('/update/:id',updatepurchase);

module.exports =router;