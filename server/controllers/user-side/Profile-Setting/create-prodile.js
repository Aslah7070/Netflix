

const User=require("../../../models/user.models")

const Profile=require("../../../models/Profiles.model")


const createProfile = async (req, res) => {
  try {
    const { profileData } = req.body; // profileData contains name, image, and myList
    const userId = req.user.userId;  // Assuming userId is attached to the request after authentication

    console.log("userId", userId);

    // Find the user
    const user = await User.findById(userId);
    console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the profile document associated with the user
    let userProfile = await Profile.findOne({ user: userId });

    if (!userProfile) {
      // If no profile exists, create a new profile document
      userProfile = new Profile({
        user: userId,
        profiles: [],
      });
    }

    // Add the new profile to the profiles array
    userProfile.profiles.push({
      name: profileData.name,
      image: profileData.image,
      myList: profileData.myList,
    });

    // Save the updated profile document
    const savedProfile = await userProfile.save();

    // Set the currentProfile field in the User model to the updated profile's ID
    user.currentProfile = savedProfile._id;
    await user.save();

    res.status(201).json({
      message: "Profile created and set as current profile",
      profile: savedProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



const setCurrentProfile=async(req,res)=>{
    try {
        const { profileId } = req.body; // profileId contains the ID of the profile to be set as current profile
        const userId = req.user.userId;  // Assuming userId is attached to the request after authentication
    
        console.log("userId", userId);
        console.log("profileId", profileId);
    
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Find the user's profile document
        const userProfile = await Profile.findOne({ user: userId });
        if (!userProfile) {
          return res.status(404).json({ message: "User profile not found" });
        }
    
        console.log("userProfile",userProfile)
        const profileToSet = userProfile.profiles.id(profileId);
        console.log("profileToSet",profileToSet)
        if (!profileToSet) {
          return res.status(404).json({ message: "Profile not found" });
        }
    
        
        user.currentProfile = userProfile._id;  
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
}

const getProfile=async(req,res)=>{
    try {
        const userId = req.user.userId;
    
       
        const user = await User.findById(userId).populate("currentProfile");
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        
        res.status(200).json({
          message: "Current user found",
          user: {
            email: user.email,
            username: user.username,
            image: user.image,
            role: user.role,
            currentProfile: user.currentProfile, 
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
}

const getAllProfiles=(req,rees)=>{
    
}

module.exports={createProfile,setCurrentProfile,getProfile}