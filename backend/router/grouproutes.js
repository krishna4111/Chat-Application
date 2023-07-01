const express=require('express');
const router=express.Router();

const GroupController=require('../controller/groupcontroller');
const middleware=require('../middleware/auth')

router.post('/create-group', middleware.authentication , GroupController.createGroup);

router.post('/add-member',GroupController.addmember);

module.exports=router;