

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

    // Create a new profile
const numberOfProfile=await Profile.countDocuments()
console.log("numberOfProfile",numberOfProfile);
if(numberOfProfile>=5){
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
    const userId = req.user.userId; // Extract user ID from authenticated request

    // Fetch the user and populate the currentProfile field
    const user = await User.findById(userId).populate("currentProfile");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if currentProfile exists
    if (!user.currentProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Current profile not set" });
    }

    res.status(200).json({
      success: true,
      currentProfile: user.currentProfile, // Return the populated currentProfile
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

    // Log inputs for debugging
    console.log("profileId:", profileId);
    console.log("userId:", userId);
    console.log("image:", image);

    // Validate userId
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }

    // Fetch the user profile
    const user = await Profile.findOne({ user: userId });

    console.log("Fetched user:", user);

    // If user not found
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Fetch the profile by ID
    const profile = await Profile.findById(profileId);

    console.log("Fetched profile:", profile);

    // If profile not found
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    profile.image=image;
   await profile.save()
    // Respond with success
    return res.status(200).json({
      success: true,
      message: "Profile image changed successfully",
      profile,
    });
  } catch (error) {
    console.error("Error changing profile image:", error);

    // Handle errors appropriately
    return res.status(500).json({
      success: false,
      message: "An error occurred while changing the profile image",
      error: error.message,
    });
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

module.exports={createProfile,setCurrentProfile,getCurrentProfile,getAllProfiles,fidProfileById,confirmViewRestrictionsPage,tranferprofile,validateRecivedPasswordAccount,changeProfileImge}