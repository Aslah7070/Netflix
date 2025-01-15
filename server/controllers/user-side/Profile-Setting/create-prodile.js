

const User=require("../../../models/user.models")

const Profile=require("../../../models/Profiles.model")
const Avatar=require("../../../models/avatarcollection")
const bcrypt=require("bcrypt");
const { message } = require("../../../validations/signupValidation");


const createProfile = async (req, res) => {
  try {
    const { profileData } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   const prfiles=await Profile.find({user:userId})
   console.log("prfilesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",prfiles);
   
const numberOfProfile=await Profile.countDocuments()
console.log("numberOfProfile",numberOfProfile);
if(prfiles.length>=5){
 return  res.status(404).json({success:false,message:`only you can create  ${numberOfProfile} profiles` })
}
 

    const newProfile = new Profile({
      user: userId,
      name: profileData.name,
      image: profileData.image,
      avatar: profileData.avatar,
      myList: profileData.myList || [],
    });

    const savedProfile = await newProfile.save();

    user.currentProfile = savedProfile._id;
    await user.save();

    res.status(201).json({
      message: "Profile created and set as current profile",
      profile: savedProfile,
      countOfProfiles:numberOfProfile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const setCurrentProfile = async (req, res) => {
  try {
    const { profileId } = req.body; 
    const userId = req.user.userId; 

    console.log("userId:", userId); 
    console.log("profileId:", profileId);

    // Fetch the user by ID
    const user = await User.findById(userId);
    console.log(" on current    sadfffffffffffffffssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const userProfile = await Profile.find()
    if (!userProfile) { 
      return res.status(404).json({ message: "User profile not found" });
    }

    console.log("userProfile:", userProfile);

    
    const profileToSet = userProfile.find((profile) => profile._id.toString() === profileId);
    if (!profileToSet) {
      return res.status(404).json({ message: "Profile not found" });
    }


    user.currentProfile = profileToSet._id;
    await user.save();

    res.status(200).json({
      message: "Current profile has been updated",
      user: {
        email: user.email,
        username: user.username,
        image: user.image,
        role: user.role,
        currentProfile: profileToSet, 
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




const getAllProfiles=async(req,res)=>{
    try {
        const userId = req.user.userId;
    console.log("userId",userId);
    console.log("req.user",req.user);
    
       
        const user = await Profile.find({ user: userId })
        console.log("sadfffffffffffffffssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",user);
        
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    console.log("user.currentProfile",user);
    
        
        res.status(200).json({
          message: "all profiles",
          allProfile:user
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
}

const getCurrentProfile = async (req, res) => {
  try {
    const userId = req.user.userId; 


    const user = await User.findById(userId).populate("currentProfile");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.currentProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Current profile not set" });
    }

    res.status(200).json({
      success: true,
      currentProfile: user.currentProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const fidProfileById=async(req,res)=>{
 const {profileId}= req.params
 const userId=req.user
 console.log("profileId",profileId);
 
 const user=await Profile.find(userId)
console.log(" on current    sadfffffffffffffffssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",user);
 
 if(!user){
 return res.status(200).json({success:true,message:"user not found"})
 }
 const pro=user.find((profile)=>profile._id.toString()===profileId)


 

res.status(200).json({success:true,pro})

}

const changeProfileImge = async (req, res) => {
  try {
    const { profileId,image } = req.body;
    const userId = req.user?.userId;
    console.log("profileId:", profileId);
    console.log("userId:", userId);
    console.log("image:", image);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }
    const user = await Profile.findOne({ user: userId });

    console.log("Fetched user:", user);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const profile = await Profile.findById(profileId);

    console.log("Fetched profile:", profile);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    profile.image=image;
   await profile.save()
 
    return res.status(200).json({
      success: true,
      message: "Profile image changed successfully",
      profile,
    });
  } catch (error) {
    console.error("Error changing profile image:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while changing the profile image",
      error: error.message,
    });
  }
};

const findthAccount=async(req,res)=>{
  const userId= req.user.userId

  if(!userId){
    return res.status(404).json({success:false,message:"user not found"})
  }
  const account= await User.findById(userId)
  if(!account){
    return res.status(200).json({success:"true",message:"no account with this id"})
  }
  res.status(200).json({success:true,message:"founded",account})
}





const deleteProfileById = async (req, res) => {
  try {
    const { profileId } = req.params; 
    const userId = req.user.userId; 

    console.log("userId", userId);
    console.log("req.user", req.user);

  
    const profiles = await Profile.find({ user: userId });
    console.log("profiles", profiles);

   
    if (!profiles || profiles.length === 0) {
      return res.status(404).json({ success: false, message: "User has no profiles" });
    }

   
    const profileToDelete = profiles.find((profile) => profile._id.toString() === profileId);
    console.log("profileToDelete", profileToDelete);

   
    if (!profileToDelete) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    
    await Profile.findByIdAndDelete(profileId);
    console.log(`Profile with ID ${profileId} deleted successfully`);

    res.status(200).json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};





  const confirmViewRestrictionsPage=async(req,res)=>{
    const userId = req.user.userId;
    const { password } = req.body;

    
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

   
    const userResponse = {
      _id: user._id,
      name: user.name, 
      email: user.email, 
       
    };

    res.status(200).json({ success: true, user: userResponse });

  }


  const tranferprofile=async(req,res)=>{
    try {
      const { email, password, profileId } = req.body;
  

      if (!email || !password || !profileId) {
        return res.status(400).json({ message: "All fields are required" });
      }
  

      const targetUser = await User.findOne({ email });
      if (!targetUser) {
        return res.status(404).json({ message: "Target user not found" });
      }
  
    console.log("targetUser",targetUser);
    if(targetUser.role!=="premium"){
      return res.status(400).json({success:false,message:"target user not a prime costomer",targetUser:targetUser})
    }
    
   
      const isPasswordValid = await bcrypt.compare(password, targetUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
  console.log("targetUser",targetUser);
  
      if (targetUser.role!=="premium") {
        return res.status(403).json({
          message: "Target user must have a premium account to transfer the profile.",
          targetUser:targetUser
        });
      }
      const profile = await Profile.findById(profileId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
  
     
      if (String(profile.user) === String(targetUser._id)) {
        return res.status(400).json({
          message: "Profile is already associated with this user.",
        });
      }
  
   
      profile.user = targetUser._id;
      await profile.save();
  
     
      targetUser.currentProfile = profile._id;
      await targetUser.save();
  
      res.status(200).json({
        message: "Profile transferred successfully.",
        profile,
        targetUser,
      });
    } catch (error) {
      console.error("Error transferring profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  const validateRecivedPasswordAccount=async(req,res)=>{
    const { currentPassword,email } = req.body;
    console.log("currentPassword",currentPassword);
    console.log("email",email);
    

    try {
       
        const user = await User.findOne({ email:email}); 


        if (!user) {
            return res.status(400).json({ isValid: false, message: 'User not found' });
        }

        
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (isPasswordValid) {
            return res.status(200).json({ isValid: true });
        } else {
            return res.status(400).json({ isValid: false, message: 'Incorrect password' });
        }
    } catch (error) {
        console.error("Error validating password:", error);
        return res.status(500).json({ isValid: false, message: 'Server error' });
    }

  }


  const profileBlock = async (req, res) => {
    try {
      const userId = req.user?.userId;
      const { profileId } = req.params;
      const { pinNumber } = req.body;
  
     
      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }
  
      if (!profileId) {
        return res.status(400).json({ success: false, message: "Profile ID is required" });
      }
  
    
      if (!pinNumber || !/^\d{4}$/.test(pinNumber)) {
        return res
          .status(400)
          .json({ success: false, message: "A valid 4-digit PIN is required" });
      }
  
   
      const profiles = await Profile.find({ user: userId });
  
      if (!profiles || profiles.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No profiles found for this user" });
      }
  
      const profile = profiles.find((profile) => profile._id.toString() === profileId);
  
      if (!profile) {
        return res.status(404).json({ success: false, message: "Profile not found" });
      }
  
     
      profile.pinNumber = pinNumber;
  
     
      await profile.save();
  
      res.status(200).json({
        success: true,
        message: "Profile locked successfully",
        profile,
      });
    } catch (error) {
      console.error("Error locking profile:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while locking the profile",
      });
    }
  };


  const unLockProfile=async(req,res)=>{
    const userId = req.user?.userId;
    const { profileId } = req.params;
    const { pinNumber } = req.body;

   
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    if (!profileId) {
      return res.status(400).json({ success: false, message: "Profile ID is required" });
    }

   
    if (!pinNumber || !/^\d{4}$/.test(pinNumber)) {
      return res
        .status(400)
        .json({ success: false, message: "A valid 4-digit PIN is required" });
    }


    const profiles = await Profile.find({ user: userId });

    if (!profiles || profiles.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No profiles found for this user" });
    }

 
    const profile = profiles.find((profile) => profile._id.toString() === profileId);

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    
    if(profile.pinNumber!==pinNumber){
      return res.status(400).json({success:false,message:"password is inCorrect"})
    }
       res.status(200).json({success:true,message:"password is correct"})

  }
  

module.exports={ findthAccount, unLockProfile,profileBlock,createProfile,setCurrentProfile,getCurrentProfile,getAllProfiles,fidProfileById,confirmViewRestrictionsPage,tranferprofile,validateRecivedPasswordAccount,changeProfileImge,deleteProfileById}