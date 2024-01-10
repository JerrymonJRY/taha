const express =require('express');
const router =express.Router();

const {createTable,getallTable,getTable,updateTable,deleteTable} =require('../controller/tableController');

router.post('/createtable',createTable);
router.get('/alltable',getallTable);
router.get('/gettable/:id',getTable);
router.put('/updateTable/:id',updateTable);
router.delete('/deleteTable/:id',deleteTable);


module.exports =router;