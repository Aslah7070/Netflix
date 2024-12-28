

const User=require("../../../models/user.models")

const Profile=require("../../../models/Profiles.model")
const Avatar=require("../../../models/avatarcollection")



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
        currentProfile: profileToSet, // Return the populated profile
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getProfile=async(req,res)=>{
    try {
        const userId = req.user.userId;
    
       
        const user = await User.findById(userId).populate("currentProfile")
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    console.log("user.currentProfile",user.currentProfile);
    
        
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

const getAllProfiles=async(req,res)=>{
  const allProfile=await Profile.find()

  res.status(200).json({success:true ,allProfile} )
}

module.exports={createProfile,setCurrentProfile,getProfile,getAllProfiles}