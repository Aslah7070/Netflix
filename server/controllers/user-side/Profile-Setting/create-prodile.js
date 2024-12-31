

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
 console.log("user",user);
 
 if(!user){
 return res.status(200).json({success:true,message:"user not found"})
 }
 const pro=user.find((profile)=>profile._id.toString()===profileId)


 

res.status(200).json({success:true,pro})

}

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

module.exports={createProfile,setCurrentProfile,getCurrentProfile,getAllProfiles,fidProfileById,confirmViewRestrictionsPage}