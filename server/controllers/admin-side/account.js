const User=require("../../models/user.models")


const findAllAccounts=async(req,res)=>{
    

    const accounts=await User.find()
    if(!accounts){
        return res.status(404).json({success:false,message:"no users"})
    }
    console.log("accounts",accounts);
    

    res.status(200).json({success:true,message:"founded the users",accounts})
}

module.exports={findAllAccounts}