

import React, { useEffect, useState } from 'react';
import { AiOutlineLock } from 'react-icons/ai';
import { MdOutlineLanguage } from 'react-icons/md';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import api from '../../axiosInstance/api';
import DeleteProfile from './DeleteProfile';

const ProfileSettings = () => {
    const {profileId}=useParams()
    console.log("profileId on settikngs",profileId);
    
      const [selectedProfile,setSelectedProfile]=useState("")
      const [deleteState,setDeleteState]=useState(false)
console.log("selectedProfile",selectedProfile);


    const findProfile=async()=>{
        
        const response=await api.get(`/fidPprofilebyid/${profileId}`)
        console.log("responseddddddddddddddddd",response.data);
        setSelectedProfile(response.data.pro)
      }
      useEffect(()=>{
        findProfile()
        handleScroll()
      },[profileId])
    const navigate=useNavigate()

const handleScroll=()=>{
  console.log("heyyyyyy");
  
  window.scrollTo({
    top: 0,
    behavior: 'smooth', 
  });
}
    const handleDelete=()=>{
      handleScroll()

      setDeleteState(true)
      deleteState && <DeleteProfile deleteState={deleteState} setDeleteState={setDeleteState} />


    }

    const handleActions = (index) => {
      switch (index) {
        case 0:
          console.log('Navigate to Languages settings');
          // Add navigation or action logic here
          break;
        case 1:
          console.log('Navigate to Viewing restrictions');
          navigate(`/restrictions/${profileId}`)
          break;
        case 2:
          console.log('Navigate to Subtitle appearance');
          break;
        case 3:
          console.log('Navigate to Playback settings');
          break;
        case 4:
          console.log('Navigate to Notification settings');
          break;
        case 5:
          console.log('Navigate to View activity');
          break;
        case 6:
          console.log('Navigate to Profile transfer');
          navigate(`/transfercontext/${profileId}`)
          break;
        default:
          console.log('Unknown action');
      }
    };
   
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md relative">

        <div className='absolute w-full  ms-auto  flex justify-center items-center '>
      {   deleteState && <DeleteProfile deleteState={deleteState} setDeleteState={setDeleteState} />}
       
         
         </div>
      <h1 className="text-4xl font-semibold mb-6">Manage profile and preferences</h1>

   
      <div className="space-y-6">
        {/* Profile Section */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4"
          onClick={()=>navigate(`/editprofile/${profileId}`)}
          >
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">
              <img src={selectedProfile.image} alt="" />
            </div>
            
            <div>
              <h2 className="font-semibold text-2xl text-gray-800">{selectedProfile.name}</h2>
              <p className="text-sm text-gray-500">Edit personal and contact info</p>
            </div>
          </div>
          <HiOutlinePencilAlt className="text-gray-400 " size={20} />
        </div>

        {/* Profile Lock */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
       
          <div className="flex items-center space-x-4">
            <AiOutlineLock size={24} className="text-gray-500" />
            <div
            onClick={()=>navigate(`/profileLock/${profileId}`)}
            >
              <h2 className="font-semibold text-2xl text-gray-800">Profile Lock</h2>
              <p className="text-sm text-gray-500">Require a PIN to access this profile</p>
            </div>
          </div>
          <HiOutlinePencilAlt className="text-gray-400" size={20} />
        </div>

        {/* Preferences */}
        <h2 className="text-2xl font-semibold mt-6">Preferences</h2>

        <div className="space-y-4">
          {[
            {
              icon: <MdOutlineLanguage size={24} className="text-gray-500" />,
              title: 'Languages',
              description: 'Set languages for display and audio',
            },
            {
              icon: <AiOutlineLock size={24} className="text-gray-500 " />,
              title: 'Viewing restrictions',
              description: 'Edit maturity rating and title restrictions',
            },
            {
              icon: <AiOutlineLock size={24} className="text-gray-500" />,
              title: 'Subtitle appearance',
              description: 'Customize the way subtitles appear',
            },
            {
              icon: <AiOutlineLock size={24} className="text-gray-500" />,
              title: 'Playback settings',
              description: 'Set autoplay and audio, video quality',
            },
            {
                icon: <AiOutlineLock size={24} className="text-gray-500" />,
                title: 'Notification Settings',
                description: 'manage notification for email,text,push',
              },
              {
                icon: <AiOutlineLock size={24} className="text-gray-500" />,
                title: 'View activity',
                description: 'manage viewing history and ratings',
              }, 
              {
                icon: <AiOutlineLock size={24} className="text-gray-500" />,
                title: 'Profile transfer',
                description: 'copy this profile to another account',
              }, 
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div 
                 onClick={()=>handleActions(index)}
              className="flex items-center space-x-4">
                {item.icon}
                <div>
                  <h2 className="font-semibold text-2xl text-gray-800">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <HiOutlinePencilAlt className="text-gray-400" size={20} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center  h-20 w-full p-4 border rounded-lg">
  <RiDeleteBin6Line className="text-xl my-auto" />
  <p
  onClick={handleDelete}
  className="text-xl text-center font-semibold my-auto">Delete profile</p>
</div>

    </div>
  );
};

export default ProfileSettings;

