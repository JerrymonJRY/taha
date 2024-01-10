const express =require('express');
const router =express.Router();

const {createSupplier,viewSupplier } =require('../controller/supplierController');

router.post('/createsupplier',createSupplier);
router.get('/allSupplier',viewSupplier);

module.exports =router;