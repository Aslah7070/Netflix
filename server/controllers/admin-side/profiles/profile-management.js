


const ProfileIcon=require("../../../models/profileicons.mode")
const Avatar =require("../../../models/avatarcollection")
const Profile=require("../../../models/Profiles.model")

const uploadProfiles=async(req,res)=>{
    try {
      

        console.log("file",req.files);
        
        const imageUrls = req.files.map(file => file.path); 
    console.log("imageUrls",imageUrls);
    
        const profileIcon = await ProfileIcon.findOneAndUpdate(
          { name: req.body.name },  
          { $push: { profileImages: { $each: imageUrls } } },  
          { new: true, upsert: true }  
        );
    
        return res.status(200).json({
          message: "Profile images uploaded successfully",
          profileIcon,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error saving profile images" });
      }

    
}

const getprofiles=async(req,res)=>{

const profileicons=await ProfileIcon.find()
console.log("profileicons",profileicons);

res.status(200).json({success:true,profileicons})

}




const createAvatar = async (req, res) => {
  try {
    // Check if files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded!" });
    }

    console.log("req.files", req.files);

    // Map uploaded files to the required format
    const uploadedImages = req.files.map((file) => ({
      image: file.path,
    }));

    console.log("uploadedImages", uploadedImages);

   
    const newAvatar = new Avatar({
      avatar: uploadedImages, 
    });

    // Save the document to the database
    await newAvatar.save();

    res.status(201).json({
      message: "New avatar created successfully!",
      data: newAvatar,
    });
  } catch (error) {
    console.error("Error creating new avatar:", error);
    res.status(500).json({ error: error.message });
  }
};




const getAvatar=async(req,res)=>{
  const avatar=await Avatar.find()

  console.log("avatar",avatar);
  
  res.send(avatar)

}



const getProfileByUserId = async (req, res) => {
  try {
 
    const { userId } = req.params;

    
    const profile = await Profile.find({ user: userId });

  
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

   
    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

module.exports={uploadProfiles,getprofiles,createAvatar,getAvatar,getProfileByUserId}