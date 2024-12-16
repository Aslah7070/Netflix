const jwt=require("jsonwebtoken");
const generateRefreshTokenAndCookies=(userId,res)=>{
    const refreshToken=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"15d"})
    
    console.log("userId",userId);
    

    res.cookie("refreshJwtNetflix", refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: false, 
 
      });


    return refreshToken
}
module.exports={generateRefreshTokenAndCookies} 