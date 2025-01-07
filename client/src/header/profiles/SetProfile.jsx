

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../axiosInstance/api";
import { useNavigate } from "react-router-dom";
import { allProfiles, setCurrentProfile } from "../../redux/profile.slice";


const SetProfile = () => {
  const avatars = useSelector((state) => state.profile.avatars); 
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [profileName, setProfileName] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(false); 
const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(() => {
    const savedIndex = localStorage.getItem("avatarIndex");
    if (savedIndex !== null) {
      setCurrentAvatarIndex(Number(savedIndex));
    }
  }, []);

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
    if (!profileName) {
      alert("Please enter a profile name!");
      return;
    }

    const profileData = {
      name: profileName,
      image: avatars[currentAvatarIndex].image,
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
        navigate("/manageprofile")
        
      }

      setSuccess(true);
            setProfileName(""); 

      // Increment the avatar index and save it to localStorage
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
    setProfileName("")
    navigate(-1)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full h-full  py-8  z-20">
      <div className="bg-white shadow-lg rounded-lg p-6 w-5/12 h-5/6">
        <div className="flex flex-col pb-5 mt-24">
          <h1 className="text-6xl text-center font-bold text-gray-800 mb-6">
            Add a Profile
          </h1>
          <span className="text-center text-xl">
            Add a profile for another person watching Netflix.
          </span>
        </div>
        <div className="flex items-center mb-4">
          <img
            src={avatars[currentAvatarIndex].image || ""}
            alt="Profile Avatar"
            className="w-16 h-16  bg-gray-200 object-cover mr-4"
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
          <p className="text-gray-600 text-3xl font-bold">Children Profile</p>
          <span>Only see kid-friendly TV shows and movies</span>
        </div>
        <div className="flex flex-col space-y-3 mt-20">
          <button
            onClick={handleSave}
            className="bg-black text-2xl text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleCancel}
            className=" text-black text-2xl px-4 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default SetProfile;
