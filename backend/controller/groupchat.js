const Chat=require('../model/chat');
const User=require('../model/user');
const sequelize=require('../util/database')
const UserGroup=require('../model/usergroup')
const Group=require('../model/group');


const sendMessage=async (req,res)=>{
    const t = await sequelize.transaction();
    try{
       const{msg,groupname}=req.body;
       const group=await Group.findOne({groupname});
       const chatDetails= await Chat.create({msg ,username:req.user.name, userId:req.user.id,groupId:group.id});
       res.status(200).json({success:true , chatDetails});
       await t.commit();
    }
    catch(err){
        console.log(err);
        await t.rollback();
        res.status(500).json({success:false});
       
    }
}


const showAllChat=async (req,res)=>{
    try{
        const groupname=req.params.groupname;
        const group= await Group.findOne({where:{groupname}});
        const chat=await Chat.findAll({where:{groupId:group.id}});
        res.status(200).json({chat});
       
    }
    catch(err){
       console.log(err);
       return res.status(500).json("something went wrong");
    }
}



module.exports={
    sendMessage,
    showAllChat
}