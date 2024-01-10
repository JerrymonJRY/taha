const express =require('express');
const router =express.Router();

const { createCash,getCashdrop } =require('../controller/cashdropController');

router.post('/cashcreate',createCash);
router.get('/getCashdrop',getCashdrop);

module.exports =router;