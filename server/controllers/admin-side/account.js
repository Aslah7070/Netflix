const User=require("../../models/user.models");
const { message } = require("../../validations/signupValidation");


const findAllAccounts=async(req,res)=>{
    

    const accounts=await User.find()
    if(!accounts){
        return res.status(404).json({success:false,message:"no users"})
    }
    console.log("accounts",accounts);
    

    res.status(200).json({success:true,message:"founded the users",accounts})
}



const findAccount = async (req, res) => {
    const { userId } = req.params;  
    
    if (!userId) {
      return res.status(404).json({ success: false, message: "userId not found" });
    }
  
    try {
      const account = await User.findById(userId);  
      
      if (!account) {
        return res.status(404).json({ success: false, message: "user not found" });
      }
  
      res.status(200).json({ success: true, message: "account found", account });
    } catch (error) {
      console.error("Error finding user:", error);
      res.status(500).json({ success: false, message: "An error occurred", error: error.message });
    }
  };
  
  module.exports = { findAccount };
  
const banAccount = async (req, res) => {
    const { userId } = req.params; 
   
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
     
      user.banned = true;
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "User has been banned successfully",
        user,
      });
    } catch (error) {
      console.error("Error banning user:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while banning the user",
        error: error.message,
      });
    }
  };

  const findPrimeUser=async(req,res)=>{
    const userId=req.user.userId
    const users=await User.find(userId)
    if(!users){
      res.status(404).json({success:false,message:" users not found"})
    }
    const prime=users.filter((user)=>user.role==="premium")
    if(prime.length===0){
      return res.status(200).json({success:true ,message:"no prime users available"})
    } 
    const nonPrime=users.filter((user)=>user.role==="user")
    if(nonPrime.length===0){
      return res.status(200).json({success:true ,message:"nonPrime users not  available"})
    } 
    res.status(200).json({success:true,message:"users founded",prime,nonPrime})
    
  }

  const unbanAccount = async (req, res) => {
    const { userId } = req.params; 
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
   
      user.banned = false;
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "User has been unbanned successfully",
        user,
      });
    } catch (error) {
      console.error("Error unbanning user:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while unbanning the user",
        error: error.message,
      });
    }
  };
  


  const addBannedFieldToExistingUsers = async (req, res) => {
    try {
      const users = await User.updateMany(
        { $or: [{ banned: { $exists: false } }, { banned: { $eq: undefined } }] },
        { $set: { banned: false } }
      );

      
      res.status(200).json({ success: true, message: "Banned field updated for all users", users });
      console.log("Banned field added to all existing users.");
    } catch (error) {
      console.error("Error updating existing users:", error);
      res.status(500).json({ success: false, message: "Error updating users", error });
    }
  };
  
  module.exports = { findAllAccounts,unbanAccount,findPrimeUser, banAccount,findAccount, addBannedFieldToExistingUsers };
  