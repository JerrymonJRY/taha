const express =require('express');
const router =express.Router();

const {createDesignation,getDesignation,editDesignation,updateDesignation,deleteDesignation} =require('../controller/designationController');

router.post('/designationCreate',createDesignation);
router.get('/designationView',getDesignation);
router.get('/designationEdit/:id',editDesignation);
router.put('/designationUpdate/:id',updateDesignation);
router.delete('/designationDelete/:id',deleteDesignation);


module.exports =router;