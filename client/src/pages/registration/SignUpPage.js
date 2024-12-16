

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosInstance/api';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus, setUserData } from '../../redux/slice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUpPage = () => {

  const dispatch=useDispatch()
  const navigate = useNavigate();
const emailFromStore=useSelector((state)=>state.user.email)

  const [formData, setFormData] = useState({
    email: emailFromStore || '',
    password: '',
  });
  const [showPassword,setShowPassword]=useState(false)
  const [error,setError]=useState("")
  const Icon = showPassword ? FaEye : FaEyeSlash;
console.log("Fd",formData);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
    });
  };


const handlePasswordError=()=>{
  const {password}=formData
  if(password.length<6){
    setError("Password must be at least 6 characters")
  }else{
    setError("")
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/signup', formData);
      console.log("API Response:", response.data);
  
      if (response.data.success) {
        const user = response.data.user;
  
        console.log("User Data:", user);
        dispatch(setUserData(user));
        console.log("setUserData Dispatched");
  
        dispatch(setLoginStatus(true)); 
        console.log("setLoginStatus Dispatched");
  
      } else {
        console.error("Sign-Up Failed:", response.data.message);
      }
    } catch (error) {
      
      console.error("Error during sign-up:", error);
    }
  };
  

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

useEffect(() => {
  console.log("isLoggedIn changed:", isLoggedIn);
  if (isLoggedIn) {
    navigate('/verifyemail');
  }
}, [isLoggedIn]);

  return (
    <div className="min-h-screen flex justify-center bg-white">
      <div className="flex flex-col items-center w-2/3 mt-5">
        <div className="text-start mt-3">
          <div className="text-sm">
            <span className="text-gray-700">STEP <b>2</b> OF <b>4</b></span>
            <h1 className="text-gray-800 text-3xl font-bold mt-2">
              Create a password to start <br /> your membership
            </h1>
          </div>

          <div className="text-gray-600 mt-4 text-lg">
            Just a few more steps to finish setting up your account.
          </div>

          <form onSubmit={handleSubmit} className="mt-6 w-full">
            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                name="email" // Match with state field
                className="w-full h-16 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-red-600"
                placeholder="Email Address"
                value={emailFromStore}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4 relative ">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    className="w-full h-16 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-red-600"
    placeholder="Create a password"
    value={formData.password}
    onChange={handleChange}
    required
    onBlur={handlePasswordError}
  />
  <Icon
    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-600"
    onClick={() => setShowPassword(!showPassword)}
  />
</div>
<span className='text-red-900'>{error&&error}</span>

           

            {/* Next Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="bg-red-600 w-full h-16 text-white px-16 py-3 font-bold hover:bg-red-700 transition-colors"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
