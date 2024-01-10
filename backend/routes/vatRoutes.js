const express =require('express');
const router =express.Router();

const {createVat,getallVat,getVat,updateVat,deleteVat} =require('../controller/vatController');

router.post('/createvat',createVat);
router.get('/allvat',getallVat);
router.get('/getvat/:id',getVat);
router.put('/updateVat/:id',updateVat);
router.delete('/deleteVat/:id',deleteVat);

module.exports =router;