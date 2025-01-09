import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../axiosInstance/api';

const DeleteProfile = ({ deleteState, setDeleteState }) => {
    console.log("props",deleteState)
     const [selectedProfile, setSelectedProfile] = useState("");
     const [visible,setVisible]=useState(deleteState)
     console.log("visible",visible);

     const navigate=useNavigate()
    const {profileId}= useParams()
    const findProfile = async () => {
        try {
          const response = await api.get(`/fidPprofilebyid/${profileId}`);
          console.log("Profile Data:", response.data.pro);
          setSelectedProfile(response.data.pro);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
    
      useEffect(() => {
        findProfile();
       
      }, [profileId]);


      const handleDeleteProfile=async()=>{
        const response=await api.delete(`/deleteprofile/${profileId}`)
  console.log("response on delete profile",response);
  if(response.data.success===true){
    findProfile();
    navigate("/manageprofile")
  }
      }

      const handleScroll=()=>{
        console.log("hdhdh");
        
        window.scroll({
            top:0,
            behavior:"smooth"
        })
      }

      const handleCancel=()=>{
        handleScroll()
       setVisible(false)
       setDeleteState(false)
      }
  return (
   <>
   {
    visible&&(
        <div className="h-screen  flex items-center justify-center   p-6 z-10">
        <div className=" flex flex-col justify-center items-center border border-black bg-white rounded-lg shadow-[10px_14px_16px_14px_rgba(0,0,0,0.5)] w-full max-w-4xl h-4/6 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Delete Profile?</h1>
          
          <div className="flex flex-col space-y-5 items-center mb-4">
            <img 
              src={selectedProfile?.image}
              alt="Profile" 
              className="w-40 h-36  bg-gray-200 object-cover mr-4" 
            />
            <p className="text-lg font-semibold text-gray-700">{selectedProfile?.name}</p>
          </div>
          
          <p className="text-xl text-center text-gray-600 mb-6">
            This profile's history – including My List, ratings, and activity – will be gone forever, and you won't be able to access it again.
          </p>
          
          <hr className="border-black mb-6 h-10" />
          
          <div className="flex flex-col justify-center items-center space-y-10   w-full">
            <button
            onClick={handleDeleteProfile}
            className="px-10 py-2 w-full h-16 text-2xl border border-black  text-red-800 font-semibold rounded-lg hover:bg-red-700 transition">
              Delete Profile
            </button>
            <button
            onClick={handleCancel}
            className="px-4 py-2 w-full h-16 text-2xl bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition">
              Never Mind
            </button>
          </div>
        </div>
      </div>
    )
   }
   
   </>
  );
};

export default DeleteProfile;



