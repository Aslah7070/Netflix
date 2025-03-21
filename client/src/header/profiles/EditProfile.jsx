

import React, { useEffect, useState } from 'react';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../axiosInstance/api';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileUrl } from '../../redux/profile.slice';
import DeleteProfile from './DeleteProfile';

const EditProfile = () => {
    const location=useLocation()
    console.log("location",location);
    
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profileId } = useParams();  
  const [selectedProfile, setSelectedProfile] = useState("");
  const [deleteState,setDeleteState]=useState(false)
  const findProfile = async () => {
    const response = await api.get(`/fidPprofilebyid/${profileId}`);
    console.log("responseddddddddddddddddd", response.data.pro);
    setSelectedProfile(response.data.pro);
  };

  useEffect(() => {
    findProfile();
  
  }, [ profileId, dispatch]);


  const image = useSelector((state) => state.profile.profileurl);


  const changeProfileimage=async()=>{
    const response=await api.post("/changeprofileimage",{profileId:profileId,image:image})
    console.log("change image",response);
    navigate(`/profilesettings/${profileId}`)
  }

  const handleDelete=()=>{
    setDeleteState(true)
    
    deleteState && <DeleteProfile deleteState={deleteState} setDeleteState={setDeleteState} />

  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
    <div className='absolute w-full  ms-auto  flex justify-center items-center '>
      {   deleteState && <DeleteProfile deleteState={deleteState} setDeleteState={setDeleteState} />}
       
         
         </div>
      <div className="bg-white h-screen w-full max-w-3xl p-6 rounded-lg shadow-md">
        
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <div
          onClick={() => navigate(`/pickprofileimage/${profileId}`)}
          className="mb-6 flex items-center space-x-4 relative"
        >
          <MdOutlineModeEditOutline className="absolute left-9 text-3xl" />
          <img
            src={image || selectedProfile.image}
            alt="Profile"
            className="w-24 h-20  bg-gray-200 object-cover"
          />
          <input
            type="text"
            value={selectedProfile.name}
            placeholder="Enter profile name"
            className="w-full h-16 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <p className="text-2xl font-semibold mb-2">Game Handle</p>
          <span className="text-xl text-gray-600 block mb-4">
            Your handle is a unique name that will be used for playing with other Netflix members across all Netflix Games.
            <a href="#" className="text-blue-500 hover:underline"> Learn more</a>
          </span>
          <input
            type="text"
            placeholder="Enter game handle"
            className="w-full border h-16 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <p className="text-3xl font-semibold mb-2">Contact Info</p>
          <input
            type="text"
            placeholder="Enter email"
            className="w-full border h-16 border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-xl text-gray-600">
            The email associated with this profile is also used for account access and recovery.
            Visit <a href="#" className="text-blue-500 hover:underline">account security</a> to make changes.
          </span>
        </div>

        <div className="flex flex-col space-y-4">
          <button
          onClick={changeProfileimage}
          className="w-full px-6 py-6 text-2xl bg-black text-white rounded-lg shadow hover:bg-blue-600 transition">
            Save
          </button>
          <button
          onClick={()=>navigate(`/profilesettings/${profileId}`)}
          className="w-full px-6 py-6 text-2xl bg-gray-300 text-black rounded-lg shadow hover:bg-gray-400 transition">
            Cancel
          </button>
          <button 
          onClick={handleDelete}
          className="px-10 mt-5 py-2 w-full h-16 text-2xl border border-black  text-red-800 font-semibold rounded-lg hover:bg-red-700 transition">
            Delete
          </button>
          <span className="text-sm text-gray-600">
            The primary profile cannot be deleted.
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
