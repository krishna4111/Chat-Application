const express=require('express');

const router=express.Router();
const ChatController=require('../controller/chatcontroller');
const middleware=require('../middleware/auth')

router.get('/show-all-group',middleware.authentication,ChatController.showGroups)

module.exports=router;