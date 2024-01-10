const express =require('express');
const router =express.Router();

const {createUser,loginUserController,logout,dashboard,vertifyUser} =require('../controller/userController');

router.post('/register',createUser);
router.post('/login',loginUserController);
router.get('/dashboard',dashboard);
router.get('/logout',logout);
router.post('/userData',vertifyUser);

module.exports =router;