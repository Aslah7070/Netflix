import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../axiosInstance/api";
import { useDispatch, useSelector } from "react-redux";
import { profileTranferRecivedAccount } from "../../redux/profile.slice";
import { toast, ToastContainer } from 'react-toastify';
const SelectReservedAccount = () => {
  const [selectedProfile, setSelectedProfile] = useState("");
  const [transferOption, setTransferOption] = useState("");
  const [recivedEmail,setRecivedEmail]=useState("")
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); 
  const dispatch=useDispatch()
  console.log('recivedEmail',recivedEmail);
  
const account=  useSelector((state)=>state.profile.recivedAccount)
console.log("account",account);

const navigate=useNavigate()
  const { profileid } = useParams();

  const findProfile = async () => {
    try {
      const response = await api.get(`/fidPprofilebyid/${profileid}`);
      console.log("Profile Response:", response.data.pro);
      setSelectedProfile(response.data.pro);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };


  const handleSelectPassingAccount = async () => {
    try {
      const response = await api.post("/transferprofile", {
        email,
        password,
        profileId: selectedProfile._id,
      });
      console.log("Transfer successful:", response.data);
      toast.success("Profile transferred successfully!");
      navigate("/")
    } catch (error) {
      console.error("Error transferring profile:", error.response?.data || error.message);
      
      toast.error(error.response?.data?.message || "Error transferring profile.");
      if(error.response?.data?.message==="target user not a prime costomer"){
        setRecivedEmail(error.response?.data?.targetUser.email)
        dispatch(profileTranferRecivedAccount(error.response?.data?.targetUser))
        if(error.response?.data?.targetUser.email)navigate(`/confirmtransfer/${profileid}`)
        
      }
    }
  };
  

  useEffect(() => {
    findProfile();
  }, [profileid]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };



  return (
    <div className="max-w-lg py-10 mx-auto mt-10 p-6 bg-white h-auto rounded-lg shadow-md">
      <div className="text-center">
        <img
          src={selectedProfile?.image}
          alt="Profile"
          className="w-32 h-32 mx-auto object-cover mb-4 rounded-full shadow-md"
        />
        <h1 className="text-2xl font-semibold">{selectedProfile.name}</h1>
      </div>
      <h1 className="text-4xl font-bold text-center mb-6">
        Sign in to the account you are transferring to
      </h1>

      <p className="text-lg font-medium mb-4">
        Enter the email (or phone number) and password of the existing account
        you would like to transfer your profile to.
      </p>
      <p className="text-sm text-gray-500 mb-6">
        This can be an account that belongs to someone in your household or an
        account that you have already set up.
      </p>

      <p className="text-sm text-gray-500 mb-4">
        Sign in to the account you are transferring to:
      </p>

      {/* Input Fields */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email or Phone Number
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
          placeholder="Enter email or phone number"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
          placeholder="Enter password"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button
          className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={() => console.log("Cancelled")}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
          onClick={handleSelectPassingAccount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectReservedAccount;
