const express=require('express');
const User=require('../controller/usercontroller');

const router=express.Router();


router.post('/signup',User.signup);

module.exports=router;