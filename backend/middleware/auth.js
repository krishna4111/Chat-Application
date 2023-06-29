const jwt=require('jsonwebtoken');
const User=require('../model/user')

exports.authentication= async (req,res,next)=>{
    try{
        const token=req.header('Authorization');

        const user=jwt.verify(token , "secrectkey");
        const userDetail=await User.findByPk(user.userId);
        req.user=userDetail;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success:false});
    }
   

}