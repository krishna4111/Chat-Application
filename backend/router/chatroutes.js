const express=require('express');

const router=express.Router();
const ChatController=require('../controller/chatcontroller');
const middleware=require('../middleware/auth')


router.post('/sendmessage',middleware.authentication,ChatController.sendMessage);
router.get('/show-all',middleware.authentication,ChatController.showAllChat);

router.get('/show-all-group',middleware.authentication,ChatController.showGroups)

module.exports=router;