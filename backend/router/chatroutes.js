const express=require('express');

const router=express.Router();
const ChatController=require('../controller/chatcontroller');
const middleware=require('../middleware/auth')


router.post('/sendmessage',middleware.authentication,ChatController.sendMessage);

module.exports=router;