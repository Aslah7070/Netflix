const jwt=require("jsonwebtoken");
const generateTokenAndCookies=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"15d"})
    // res.cookie("jwt-netflix",token,{
    //     httpOnly: false,    
    //     secure: true,      
    //     maxAge: 24*60*60*1000, 
    //     sameSite: 'lax', 

    // })
    console.log("userId",userId);
    

    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: false, 
 
      });

     
      

    return token
}
module.exports={generateTokenAndCookies}