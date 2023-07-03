
const UserGroup=require('../model/usergroup')

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
    showGroups
}