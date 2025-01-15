import React, { useEffect, useState } from 'react';
import api from '../../axiosInstance/api';
import { useParams } from 'react-router-dom';
import blocked from "../../assets/blockedwarning.webp";

const UsersDetails = () => {
  const [profiles, setProfiles] = useState([]);
  const [userData, setUserData] = useState(null);
  const { userId } = useParams();

  const findUser = async () => {
    try {
      const response = await api.get(`/findaccount/${userId}`);
      setUserData(response.data.account);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    findUser();
  }, [userId]);

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

  const handleUnBan = async () => {
    try {
      const response = await api.post(`/unbanaccount/${userId}`);
      setUserData(response.data.user);
    } catch (error) {
      console.error('Error unbanning account:', error);
    }
  };

  const handleBan = async () => {
    try {
      const response = await api.post(`/banaccount/${userId}`);
      setUserData(response.data.user);
    } catch (error) {
      console.error('Error banning account:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="bg-white w-full md:w-3/5 rounded-lg shadow-lg p-6">
        {userData ? (
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* User Info Section */}
            <div className="flex flex-col items-center">
              {userData.image && (
                <img
                  src={userData.image}
                  alt={userData.email || 'User'}
                  className="w-32 h-32 rounded-full shadow-lg object-cover mb-4"
                />
              )}
              <h2 className="text-xl font-semibold">{userData.email || 'Unknown User'}</h2>
              <p className={`text-sm font-medium ${userData.banned ? 'text-red-600' : 'text-green-600'}`}>
                {userData.banned ? 'Banned' : 'Active'}
              </p>
              {userData.banned ? (
                <button
                  onClick={handleUnBan}
                  className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                >
                  Unblock
                </button>
              ) : (
                <button
                  onClick={handleBan}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Block
                </button>
              )}

              {userData.banned &&(
                <img className='w-16' src={blocked} alt="" />
              )}
            </div>

            {/* User Details Section */}
            <div className="text-left">
              <p className="text-lg font-semibold">Details</p>
              <div className="mt-4 space-y-2">
                <p><strong>Email:</strong> {userData.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {userData.phone || 'N/A'}</p>
                <p><strong>Role:</strong> {userData.role || 'N/A'}</p>
                <p><strong>Current Plan:</strong> {userData.currentPlan || 'N/A'}</p>
                <p><strong>Amount:</strong> {userData.amount || 'N/A'}</p>
                <p><strong>Premium Start Date:</strong> {userData.premiumStartDate || 'N/A'}</p>
                <p><strong>Account Created:</strong> {new Date(userData.createdAt).toLocaleString() || 'N/A'}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">No user data available.</p>
        )}

        {/* Profiles Section */}
        <h2 className="text-xl font-bold mt-8 mb-4 text-center">Profiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {profiles.map((profile) => (
    <div
      key={profile._id}
      className="bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition"
    >
      <img
        src={profile.image || 'https://via.placeholder.com/150'}
        alt={profile.name || 'User'}
        className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
      />
      <h3 className="text-lg font-semibold text-center">{profile.name || 'Unknown'}</h3>
      <div className="mt-4 text-sm text-gray-700 space-y-2">
        {Object.entries(profile)
          .filter(([key]) => key !== 'image') 
          .map(([key, value]) => (
            <p key={key}>
              <strong>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:
              </strong>{' '}
              {Array.isArray(value) ? (value.length ? value.join(', ') : 'None') : value || 'N/A'}
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
