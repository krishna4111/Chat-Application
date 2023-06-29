const Chat=require('../model/chat');
const User=require('../model/user');
const sequelize=require('../util/database')


const sendMessage=async (req,res)=>{
    const t = await sequelize.transaction();
    try{
       const{msg}=req.body;
       await Chat.create({msg , userId:req.user.id})
       res.status(200).json({success:true , msg:msg ,userId:req.user.id});
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
       res.status(200).json({msg:chat});
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



module.exports={
    sendMessage,
    showAllChat
}