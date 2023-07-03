const Group=require('../model/group');
const UserGroup=require('../model/usergroup');
const sequelize=require('../util/database');
const User=require('../model/user')

const createGroup=async (req,res) => {
    const t=await sequelize.transaction();
    try{
        const {groupname}=req.body;
        const creategroup= await Group.create({groupname} , {transaction:t});
         const usergroup=await UserGroup.create({groupname,name:req.user.name,isAdmine:true, groupId:creategroup.id, userId:req.user.id} ,{transaction:t});
        await t.commit();
        res.status(200).json({creategroup , success:true , message:"group created successfulley"});
        
   }
  
    catch(err){
        console.log(err);
        await t.rollback();
       return res.status(500).json({error:err});
    }
}


const addmember=async (req,res)=>{
    const t=await sequelize.transaction();
    try{
        const {email,groupname}=req.body;
        const member=await User.findOne({where:{email}});
        const group=await  Group.findOne({where:{groupname}});
    
        const usergroup=await UserGroup.create({groupname,name:member.name ,groupId:group.id,userId:member.id },{transaction:t});
        await t.commit();
        res.status(201).json({ success:true , message:'member added onto this group successfully'});
       
    }
    catch(err){
        console.log(err);
        await t.rollback();
        res.status(500).json({error:err});
    }
    



}

module.exports={
    createGroup,
    addmember
}