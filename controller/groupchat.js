const Chat=require('../model/chat');
const User=require('../model/user');
const sequelize=require('../util/database')
const UserGroup=require('../model/usergroup')
const Group=require('../model/group');


const sendMessage=async (req,res)=>{
    const t = await sequelize.transaction();
    try{
        const groupname=req.params.groupname;
       const{msg}=req.body;
       const group=await Group.findOne({where:{groupname}});
       const chatDetails= await Chat.create({msg ,username:req.user.name, userId:req.user.id,groupId:group.id},{ transaction: t });
       await t.commit();
       res.status(200).json({success:true , chatDetails});
       
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
        const usergroup=await UserGroup.findAll({where:{userId:req.user.id , groupId:group.id}});
        res.status(200).json({chat , usergroup});
       
    }
    catch(err){
       console.log(err);
       return res.status(500).json("something went wrong");
    }
}

const makeAdmine=async (req,res)=>{
    const t = await sequelize.transaction();
    try{
        const{email,groupname}=req.body;

        const group=await Group.findOne({where:{groupname}});
        const user=await User.findOne({where:{email}});
        
        const admine=await UserGroup.update({isAdmine:true},{where:{userId:user.id , groupId:group.id}},{ transaction: t });
        await t.commit();
        res.status(201).json({success:true, message:`${user.name} is a admine now`})
    }
    catch(err){
        console.log(err);
        await t.rollback();
        res.status(202).json({success:false,error:err});
    }
   
}

const ShowAllUsers=async (req,res)=>{
    try{
        const groupname=req.params.groupname;
        const group=await Group.findOne({where:{groupname}});
        const getusers=await UserGroup.findAll({
            attributes:['name','userId','isAdmine'],
            where:{groupId:group.id}
        })
        res.status(200).json({getusers});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }
    


}
const removeUser=async (req,res)=>{
    const t = await sequelize.transaction();
    try{
   const userId=req.params.userId;
   const groupname=req.params.groupname;
   const group=await Group.findOne({where:{groupname}});
   const remove=await UserGroup.destroy({where:{groupId:group.id , userId:userId}},{transaction:t});
   await t.commit();
   res.status(201).json({message:'user removed successfuly'});
    }
    catch(err){
     console.log(err);
     await t.rollback();
     res.status(500).json({message:'somethig went wrong', error:err});
    }
}



module.exports={
    sendMessage,
    showAllChat,
    makeAdmine,
    ShowAllUsers,
    removeUser
}