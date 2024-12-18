    const jwt=require("jsonwebtoken");
    const { message } = require("../validations/signupValidation");
    const { tryCatch } = require("../utils/tryCatch");
    
    const premiumAuthentication=async(req,res,next)=>{
        try {
           
        
    const token=req.cookies.premiumToken
    console.log("token",token);
    
    if(!token){
        return res.status(404).json({success:false,message:"premium token missing"})
    }
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
            if(error){
                return res.status(400).json({success:false,message:"wrong token",reason:error})
            }else{
                req.user=user
                console.log("user",user);
                console.log("premium token is available");
                
                next()
            }
        })
    }
        } catch (error) {
            console.log("err",error);
            
        }
    }
    
    module.exports={premiumAuthentication}