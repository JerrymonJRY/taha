const express =require('express');
const router =express.Router();

const {createIngredient,getCategory,getingredientUnit,getalling,getingredient,updateingredient} =require('../controller/ingredientController');


router.post('/createingredient',createIngredient);
router.get('/getallcategory',getCategory);
router.get('/getingunit',getingredientUnit);
router.get('/getalling',getalling);
router.get('/getingredient/:id',getingredient);
router.put('/updateingredient/:id',updateingredient);

//router.get('/allingunit',getallIngunit);


module.exports =router;