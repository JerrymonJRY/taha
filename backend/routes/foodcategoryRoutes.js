const express =require('express');
const router =express.Router();

const {createFoodcategory,getallFoodcategory,getfoodcategory,updatefoodCategory,deletefoodCategory} =require('../controller/foodcategoryController');

router.post('/createfoodcategory',createFoodcategory);
router.get('/allfoodcategory',getallFoodcategory);
router.get('/getfoodcategory/:id',getfoodcategory);
router.put('/updatefoodcategory/:id',updatefoodCategory);
router.delete('/deletefoodCategory/:id',deletefoodCategory);


module.exports =router;