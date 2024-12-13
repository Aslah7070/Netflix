const User=require("../models/user.models")
const jwt=require("jsonwebtoken")
const nodemailer=require("nodemailer")
const { message } = require("../validations/signupValidation")
const bcrypt=require("bcrypt")
const forgotpass=async(req,res)=>{
   try {
    const {email}= req.body

   const user=await User.findOne({email:email})
   console.log("user",user);
   
if(!user){
   return res.status(404).json({success:false,message:"not found the user"})
}
const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"3d"})
  
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{ 
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    }
})

const mailOptions={
    from :process.env.EMAIL_USER,
    to:user.email,
    subject:"reset passsword link",
    text:`http://localhost:3000/reset_password/${user._id}/${token}`
}

transporter.sendMail(mailOptions)
res.status(200).json({success:true,message:"reset link send successull" ,id:user._id,token:token})
   } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: "Error", Message: error.message });
    
   }

}

   const verifyForgotPassword=async(req,res)=>{
   try {
    const {id,token}=req.params
 const {password,email}=  req.body
 console.log("password",password);
 
 console.log("token",token);
 console.log("id",id);
 
const user=await User.findOne({email:email})
 console.log("user",user) 
console.log("password",user.password);
const matching=await bcrypt.compare(password,user.password)
if(matching){
    return res.status(200).json({success:true,message:"password is same"})
}
const decoded=jwt.verify(token,process.env.JWT_SECRET)

console.log("decoded",decoded);
 
const hashedPassword=await bcrypt.hash(password,10)
if(hashedPassword===user.password){
    console.log("hahahahahah");
    
}

console.log("hashedPassword",hashedPassword);


await User.findByIdAndUpdate(id,{password:hashedPassword})
    

res.status(200).json({success:true,message:"password changed"})

     
   } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.json({ Status: "Error with token" });
    }
    res.send({ Status: error.message });
   }
} 

module.exports = { forgotpass,verifyForgotPassword }