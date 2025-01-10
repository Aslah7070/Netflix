const jwt=require("jsonwebtoken");
const generateTokenAndCookies=(adminId,res)=>{
    const adminToken=jwt.sign({adminId},process.env.JWT_SECRET,{expiresIn:"15d"})
    
    console.log("userId",adminId);
    

    res.cookie("adminToken", adminToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: "none",
        secure: true, 
  
      });

     
      

    return adminToken
}
module.exports={generateTokenAndCookies}