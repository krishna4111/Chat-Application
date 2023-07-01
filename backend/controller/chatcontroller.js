const Chat=require('../model/chat');
const User=require('../model/user');
const sequelize=require('../util/database')
const UserGroup=require('../model/usergroup')


const sendMessage=async (req,res)=>{
    const t = await sequelize.transaction();
    try{
       const{msg}=req.body;
      const chatDetails= await Chat.create({msg ,username:req.user.name, userId:req.user.id})
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
       const chat=await Chat.findAll();
       res.status(200).json({chat});
    //    chat.forEach(async (element)=> {
    //     const user=await User.findByPk(element.userId);
    //     //res.status(200).json({name:user.name ,mag:element});
    //    });
       
    }
    catch(err){
       console.log(err);
       return res.status(500).json("something went wrong");
    }
}

const showGroups=async (req,res)=>{
    try{
    const groups=  await UserGroup.findAll({where:{userId:req.user.id}});
    res.status(201).json({groups,success:true});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }
}



module.exports={
    sendMessage,
    showAllChat,
    showGroups
}