const User=require('../model/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


function isStringValid(string) {
    if (string == undefined || string.length == 0) {
      return true;
    } else {
      return false;
    }
}
const signup= async (req,res)=>{
  const t=await sequelize.transaction();
try{
    const { name,mobile, email, password } = req.body;
  const registereduser= await User.findOne({where :{email}});
  if(registereduser){
    return res.status(200).json({message:"This email is already present so try login"});
  }
    if (
        isStringValid(name) ||
        isStringValid(email) ||
        isStringValid(password)
      ) {
        return res.status(400).json({ err: "bad parameter, some parameter is missing" });
      }
      const saltrounds = 10;
      bcrypt.hash(password , saltrounds,async(err,hash)=>{
        await User.create({ name,mobile,email,password: hash},{transaction:t});
        await t.commit();
        res.status(201).json({ message: "successfully created new user" });
  
      })

}
catch(err){
    console.log(err);
    await t.rollback()
    res.status(500).json({error: err});

}
}


function generateAccessToken( id ,name ){
  return jwt.sign({userId:id,userName:name},"secrectkey");
}


const login=async (req,res)=>{
  
  try{
  const{email,password}=req.body;

  const user= await User.findOne({where:{email}});
  if(user){
    bcrypt.compare(password , user.password , (err,result)=>{
      if(result === true){
       return res.status(200).json({success:true, message:"user logged in successfully" , token:generateAccessToken(user.id,user.name)})
      }
      else{
        return res.status(400).json({success:false , message:"wrong password"})
      
      }
    })
  }
 else{
  return res.status(404).json({success:false,message:"user dosenot exists"})
 }


  }
  catch(err){
    console.log(err);
    res.status(500).json({message:err})
  }
}

module.exports={
    signup,
    login
  }