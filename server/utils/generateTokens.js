const jwt=require("jsonwebtoken");
const generateTokenAndCookies=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"15d"})
    
    console.log("userId",userId);
    

    res.cookie("jwtnetflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: "none",
        secure: true, 
  
      });

     
      

    return token
}
module.exports={generateTokenAndCookies}