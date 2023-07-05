const express=require('express');
const router=express.Router();

const GroupChat=require('../controller/groupchat');
const middleware=require('../middleware/auth')

router.post('/sendmessage/:groupname',middleware.authentication,GroupChat.sendMessage);
router.get('/show-all/:groupname',middleware.authentication,GroupChat.showAllChat);
router.post('/made-admine',GroupChat.makeAdmine);
router.get('/show-all-users/:groupname',GroupChat.ShowAllUsers)
router.delete('/remove-user/:userId/:groupname',GroupChat.removeUser)


module.exports=router;