const express =require('express');
const router =express.Router();

const {createUser,loginUserController,logout,dashboard,vertifyUser,getallUsers} =require('../controller/userController');

router.post('/register',createUser);
router.post('/login',loginUserController);
router.get('/dashboard',dashboard);
router.get('/logout',logout);
router.post('/userData',vertifyUser);
router.get('/getusers',getallUsers);

module.exports =router;