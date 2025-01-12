




import React, { useEffect, useState } from 'react';
import api from '../../axiosInstance/api';
import { useParams } from 'react-router-dom';
import blocked from "../../assets/blockedwarning.webp"

const UsersDetails = () => {
  const [profiles, setProfiles] = useState([]); 
  const [userData,setUserData]=useState(null)
  const { userId } = useParams();

  const findUser=async()=>{
  try {
    const response=await api.get(`/findaccount/${userId}`)
    console.log("response on user",response);
    setUserData(response.data.account)
  } catch (error) {
    console.log("error",error);
    
  }
    
  }
  useEffect(()=>{
    findUser()
  },[userId])

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await api.get(`/getprofilebyuserId/${userId}`);
        setProfiles(response.data.profile || []);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, [userId]);

  const handleUnBan = async (userId) => {
    try {
      const response = await api.post(`/unbanaccount/${userId}`);
      if (response.status === 200) {

        console.log("response un ban",response);
        
        setUserData(response.data.user)
       
      }
    } catch (error) {
      console.error('Error banning profile:', error);
    }
  };

  const handleBan = async (userId) => {
    try {
      const response = await api.post(`/banaccount/${userId}`);
      console.log("response",response);
      setUserData(response.data.user)
    } catch (error) {
      console.error('Error unbanning profile:', error);
    }
  };

  return (
    <div className='flex flex-col items-center  '>

<div className=' h-[calc(100vh-6rem)] overflow-y-auto w-3/5 border border-black '>
  
{userData ? (
  <div className="mt-6 border border-black flex justify-evenly">
     {userData.image && (
      <div className="">
        <img
          src={userData.image}
          alt={userData.email || 'User'}
          className="w-32 h-32  object-cover"
        />
        <h2 className="text-xl font-semibold">{userData.email || 'Unknown User'}</h2>

        {userData.banned ? (
                <button
                  onClick={() => handleUnBan(userData._id)}
                  className='px-10 bg-green-800 text-white'
                >
                  Unblock
                </button>
              ) : (
                <button
                  onClick={() => handleBan(userData._id)}
                  className='px-10 bg-red-800 text-white'
                >
                  Block
                </button>
              )}

             {userData.banned&& <img className='w-16 mt-10' src={blocked} alt="" />}
      </div>
    )}
    <div className="text-center mt-4">
  
      <h2 className="text-xl font-semibold">{userData.email || 'Unknown User'}</h2>
      <p className="text-lg">Email: {userData.email || 'N/A'}</p>
      <p className="text-lg">Phone: {userData.phone || 'N/A'}</p>
      <p className="text-lg">Role: {userData.role || 'N/A'}</p>
      <p className="text-lg">Current Plan: {userData.currentPlan || 'N/A'}</p>
      <p className="text-lg">Amount: {userData.amount || 'N/A'}</p>
      <p className="text-lg">Status: {userData.banned ? 'Banned' : 'Active'}</p>
      <p className="text-lg">Premium Start Date: {userData.premiumStartDate || 'N/A'}</p>
      <p className="text-lg">Account Created At: {new Date(userData.createdAt).toLocaleString() || 'N/A'}</p>
    </div>

    
  </div>
) : (
  <p className="text-center mt-6">No user data available.</p>
)}
      <h1 className='text-center'>Profiles</h1>
      <div className="flex  gap-6 p-6 justify-center items-center border border-black">
  {profiles.map((profile) => (
    <div
      key={profile._id}
      className="w-full sm:w-1/2 lg:w-1/2 bg-white shadow-lg rounded-lg p-6 overflow-hidden"
    >
      {/* Profile Image */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={profile.image || 'https://via.placeholder.com/150'}
          alt={profile.name || 'User'}
          className="w-32 h-32  object-cover mb-4"
        />
        <h2 className="text-xl font-semibold">{profile.name || 'Unknown User'}</h2>
      </div>

      {/* Profile Details */}
      <div className="text-gray-600">
        {Object.entries(profile).map(([key, value]) => (
          <p key={key} className="mb-2">
            <strong>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:
            </strong>{' '}
            {Array.isArray(value)
              ? value.length
                ? value.join(', ')
                : 'None'
              : value || 'N/A'}
          </p>
        ))}
      </div>
    </div>
  ))}
</div>

</div>
    </div>
  );
};

export default UsersDetails;
