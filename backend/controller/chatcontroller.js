const Chat=require('../model/chat');


const sendMessage=async (req,res)=>{
    try{
       const{msg}=req.body;
       await Chat.create({msg , userId:req.user.id})
       res.status(200).json({success:true , username:req.user.name , msg:msg});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false});
    }
}

module.exports={
    sendMessage
}