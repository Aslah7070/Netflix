import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlusCircle } from "react-icons/fa";
import api from '../axiosInstance/api';
import { allProfiles, setCurrentProfile } from '../redux/profile.slice';
import { useNavigate } from 'react-router-dom';

const Browse = () => {


    
    const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
    const [profileName, setProfileName] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const [success, setSuccess] = useState(false); 
    const [showAddPage,setShowAddPage]=useState(false)
    console.log("showAddPage",showAddPage);
    
    

  const navigate=useNavigate()
    const dispatch=useDispatch()
    const avatars = useSelector((state) => state.profile.avatars);
    const accountEmail=useSelector((state)=>state.user.email)
    const accountImage=useSelector((state)=>state.user.image)

    console.log("accountEmail",accountEmail);
    console.log("accountImage",accountImage);
    const accountEmailName=accountEmail.split('@')[0]
    
   useEffect(() => {
       const savedIndex = localStorage.getItem("avatarIndex");
       console.log("savedIndex (from localStorage):", savedIndex);
     
       
       const index = parseInt(savedIndex, 10);
       console.log("index",index);
       
       if (!isNaN(index)) {
        console.log("insidee",index);
         setCurrentAvatarIndex(index);
       } else {
        console.log('hey',savedIndex);
        
         setCurrentAvatarIndex(0); // Default to 0 if invalid
       }
     }, []);

    const findAccount=async()=>{
       try {
        const response=await api.get("/findthaccount")
       console.log("response on account",response)
       } catch (error) {
        console.log("error",error);
        
       }
    }
    useEffect(()=>{
        findAccount()
    },[])
  
    const display=async()=>{
        
      try {
        const response=await api.get("/getallprofiles")
     console.log("all profiles",response.data);
     
     dispatch(allProfiles(response.data.allProfile))
      } catch (error) {
        console.log("error",error);
        
      }
  
   }
   
     useEffect(()=>{  
      display() 
     },[])
   
    
  console.log("helloeoe",avatars[currentAvatarIndex]);
  
    const handleSave = async () => {
        console.log("profileName",profileName);
      if (!profileName) {
    
        return;
      }
           console.log("img",avatars[currentAvatarIndex].image)
      const profileData = {
        name: profileName,
        image: profileImage||avatars[currentAvatarIndex].image,
        myList: [], 
      };
  
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
  
        const response = await api.post("/createprofile",{profileData:profileData})
        console.log("responsesssssssssssssssssssssssss",response.data.profile);
        if(response.status){
          console.log("dsaf");
          display() 
          
          dispatch(setCurrentProfile(response.data.profile))
          setShowAddPage(false)
        
          
        }
  
        setSuccess(true);
              setProfileName(""); 
        const newIndex = (currentAvatarIndex + 1) % avatars.length;
        setCurrentAvatarIndex(newIndex);
        localStorage.setItem("avatarIndex", newIndex);
      } catch (err) {
        console.error("Error creating profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handleCancel = () => {
    //   setProfileName("")
      setShowAddPage(false)
    };






  const profiles = useSelector((state) => state.profile.Profiles);

  
  console.log("avatars",avatars);
  
  console.log("profilesppppppp", profiles);


  const handleSelectProfile=async(ProfileId)=>{
         
     const response=await api.post("/currentprofile",{profileId:ProfileId})
     console.log("current profilevvvvvvvvvvvvvvvvvvvvvvv",response.data.user.currentProfile);
     dispatch(setCurrentProfile(response.data.user.currentProfile))
     navigate("/")
  }


  const handleAddProfile=()=>{
    setShowAddPage(true)
  }

  const handleSetProfile=async(profileName,profileImage)=>{
    
    setProfileImage(profileImage)
     setProfileName(profileName)


     console.log("profileName",profileName);
      if (!profileName) {
   
        return;
      }
  
      const profileData = {
        name: profileName,
        image: profileImage||avatars[currentAvatarIndex].image,
        myList: [], 
      };
  
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
  
        const response = await api.post("/createprofile",{profileData:profileData})
        console.log("responsesssssssssssssssssssssssss",response.data.profile);
        if(response.status){
          console.log("dsaf");
          display() 
          
          dispatch(setCurrentProfile(response.data.profile))
          setShowAddPage(false)
          navigate("/")
          
        }
  
        setSuccess(true);
              setProfileName(""); 
        const newIndex = (currentAvatarIndex + 1) % avatars.length;
        setCurrentAvatarIndex(newIndex);
        localStorage.setItem("avatarIndex", newIndex);
      } catch (err) {
        console.error("Error creating profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }


  }

 
  return (


<div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 relative">
  <h1 className="text-3xl text-white font-semibold mb-8">Who's watching?</h1>
  <div className="">
  {showAddPage && (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-5/12 h-auto max-h-[90%] overflow-auto">
        <div className="flex flex-col pb-5 mt-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-center font-bold text-gray-800 mb-6">
            Add a Profile
          </h1>
          <span className="text-center text-sm sm:text-xl md:text-xl">
            Add a profile for another person watching Netflix.
          </span>
        </div>
        
        <div className="flex items-center mb-4">
          <img
            src={avatars[currentAvatarIndex]?.image || ""}
            alt="Profile Avatar"
            className="w-16 h-16 bg-gray-200 object-cover mr-4"
          />
          <input
            type="text"
            placeholder="Enter profile name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-2 h-14 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Profile created successfully!</p>}
        
        <hr className="my-4" />

        <div className="mb-4 mt-16">
          <p className="text-gray-600 text-xl sm:text-2xl md:text-3xl font-bold">Children Profile</p>
          <span>Only see kid-friendly TV shows and movies</span>
        </div>

        <div className="flex flex-col space-y-3 mt-6">
          <button
            onClick={handleSave}
            className="bg-black text-xl sm:text-2xl text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleCancel}
            className="text-black text-xl sm:text-2xl px-4 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
</div>


  <div className="flex flex-wrap justify-center items-center gap-8">
    {profiles.length>0 ? (
      profiles.map((profile) => (
        <div
          onClick={() => handleSelectProfile(profile._id)}
          key={profile._id}
          className="flex flex-col items-center w-60 h-60 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <img
            className="w-full h-full object-cover mb-4"
            src={profile.image}
            alt={profile.name}
          />
          <span className="text-lg text-gray-600 font-medium">{profile.name}</span>
        </div>
      ))
    ) : (
        <div
       onClick={()=>handleSetProfile(accountEmailName,accountImage)}
        className="flex flex-col items-center w-60 h-60 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <img
          className="w-full h-full object-cover mb-4"
          src={accountImage}
          alt={accountEmailName}
        />
        <span className="text-lg text-gray-600 font-medium">{accountEmailName}</span>
      </div>
    )}
    <div onClick={handleAddProfile} className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-60 h-60 justify-center mt-10 mb-3 items-center outline-none shadow-md hover:shadow-lg transition-shadow">
        <div className="w-60 h-60 bg-gray-500 rounded-full">
          <FaPlusCircle className="w-full h-full text-gray-800" />
        </div>
      </div>
      <span className="text-lg text-gray-600 font-medium">Add Profile</span>
    </div>
  </div>

  <button
  onClick={()=>navigate("/manageAllprofiles")}
  className="border border-black mt-16 px-16 text-3xl py-3 text-white">
    Manage Profiles
  </button>
</div>

  );
};

export default Browse;
