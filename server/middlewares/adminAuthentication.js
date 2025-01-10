const jwt=require("jsonwebtoken");
const { message } = require("../validations/signupValidation");
const { tryCatch } = require("../utils/tryCatch");

const adminAuthMiddleware=async(req,res,next)=>{
    try {
       
    
const adminToken=req.cookies.adminToken
console.log("adminToken",adminToken);

console.log("req",req);


if(!adminToken){
   return res.status(404).json({success:false,message:"Authentication token missing"})
}
if(adminToken){
    jwt.verify(adminToken,process.env.JWT_SECRET,(error,admin)=>{
        if(error){
            return res.status(400).json({success:false,message:"wrong token",reason:error})
        }else{
            req.user=admin
            console.log("user",admin);
            console.log("hellooooo rinuuu"); 
            
            next()
        }
    })
}
    } catch (error) { 
        console.log("err",error);
        
    }
}

module.exports={adminAuthMiddleware}