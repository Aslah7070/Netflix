


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../axiosInstance/api';
import { setLoginStatus, setUserData } from '../../redux/slice'
import SetProfile from './SetProfile';


const ConfirmTransfer = () => {
  const { profileid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.profile.recivedAccount);
  const currentEmail= useSelector((state)=>state.user.email)
  const [selectedProfile, setSelectedProfile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(account.email); 
  const [error, setError] = useState("")


  useEffect(() => {
    findProfile()
  }, [profileid])

  const findProfile = async () => {
    try {
      const response = await api.get(`/fidPprofilebyid/${profileid}`)
      console.log("Profile Response:", response.data.pro);
      setSelectedProfile(response.data.pro);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleValidation = async (e) => {
    e.preventDefault(); 

    

    try {
        const response = await api.post('/signup', {
            password: newPassword, 
            email: email
        });
        console.log("API Response:", response.data);
    
        if (response.data.success) {
          const user = response.data.user;
    
          console.log("User Data:", user);
          dispatch(setUserData(user));
          console.log("setUserData Dispatched");
    
          dispatch(setLoginStatus(true)); 
          console.log("setLoginStatus Dispatched");
          navigate("/")
    
        } else {
          console.error("Sign-Up Failed:", response.data.message);
        }
      } catch (error) {
        console.error("Error during sign-up:", error);
        if (error.response && error.response.data) {
          // Handle specific error messages from the server
          setError(error.response.data.error); // Set the error message from the response
        } else {
          // Handle any other error that occurs
          setError("An error occurred. Please try again later.");
        }
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-gray-500 text-sm font-medium">STEP 1 OF 3</h3>
        <h1 className="text-2xl font-semibold mt-2">
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

          Looks like this is a new email. <br />
          Let’s set up a new account.
        </h1>
        <p className="text-gray-600 text-sm mt-4">
          To use this email address, you will transfer this profile to a new
          account and <span className="font-bold">purchase a new Netflix membership.</span>
        </p>
        <div className="flex items-center justify-center mt-6">
          <img
            src={selectedProfile.image}
            alt="Profile Icon"
            className="w-20 h-20"
          />
          <p>{selectedProfile.name}</p>
        </div>
        <form className="mt-4" onSubmit={handleValidation}>
          <div>
            <label htmlFor="email" className="text-sm text-gray-700">
              New email address
            </label>
            <input
              type="email"
              id="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="example@gmail.com"
              className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="text-sm text-gray-700">
              New password
            </label>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} 
              placeholder="New password"
              className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded mt-6 hover:bg-red-700"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConfirmTransfer;

