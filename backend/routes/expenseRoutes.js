const express =require('express');
const router =express.Router();

const {createExpense,getExpense,editExpense,updateExpense,deleteExpense} =require('../controller/expenseController');

router.post('/expensecreate',createExpense);
router.get('/allexpense',getExpense);
router.get('/expenseedit/:id',editExpense);
router.put('/updateexpense/:id',updateExpense);
router.delete('/deleteexpense/:id',deleteExpense);


module.exports =router;