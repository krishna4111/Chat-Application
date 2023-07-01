const express=require('express');
const router=express.Router();

const GroupChat=require('../controller/groupchat');
const middleware=require('../middleware/auth')

router.post('/sendmessage',middleware.authentication,GroupChat.sendMessage);
router.get('/show-all/:groupname',middleware.authentication,GroupChat.showAllChat);


module.exports=router;