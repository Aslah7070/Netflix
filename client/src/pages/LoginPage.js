import React, { useEffect, useState } from 'react';
import loginBg from "../assets/hero.png";
import api from '../axiosInstance/api';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {  setLoginStatus, setUserData } from '../redux/slice';

const LoginPage = () => {
    const navigate=useNavigate()
    const emailFromRedux=useSelector((state)=>state.user.email)
    const all=useSelector((state)=>state.user)

  
    
  const [formData, setFormData] = useState({ email:emailFromRedux|| '', password: '' });
  
  useEffect(() => {
    setFormData((prev) => ({ ...prev, email: emailFromRedux || '' }));
  }, [emailFromRedux]);

  console.log("emailExcest",emailFromRedux);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
const dispatch=useDispatch()
 
  const display = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      const response = await api.post("/login", formData);
      console.log("loginnnn ",response.data);
      const user=response.data.uset 
      
      dispatch(setUserData(user))
      dispatch(setLoginStatus(true))
      
      navigate("/")
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${loginBg})` }}>
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="w-full max-w-sm px-8 py-8 bg-black bg-opacity-70 rounded-lg">
          <h1 className="text-3xl font-bold text-center text-white mb-6">Sign In</h1>

          <form onSubmit={display} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email" // Name attribute to map with state
                value={formData.email} // Controlled input value
                onChange={handleChange} // Handle change for both email and password
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-500 placeholder-shown:pt-6 focus:placeholder:text-sm focus:placeholder:top-0 focus:placeholder:scale-75 transition-all"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password" // Name attribute to map with state
                value={formData.password} // Controlled input value
                onChange={handleChange} // Handle change for both email and password
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-500 placeholder-shown:pt-6 focus:placeholder:text-sm focus:placeholder:top-0 focus:placeholder:scale-75 transition-all"
                placeholder="Enter your password"
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Sign In
            </button>

            {/* Forgot Password Link */}
            <div className="text-sm text-center mt-4">
              <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
            </div>

            {/* OR Divider */}
            <div className="text-center my-4 text-sm text-gray-600">OR</div>

            {/* Use Sign-in Code */}
            <div>
              <button
                id="signin-code-button"
                className="w-full px-4 py-2 mt-2 text-white bg-gray-600 rounded-md hover:bg-red-700"
              >
                Enter your sign-in code
              </button>
            </div>

            {/* Sign Up Option */}
            <div className="text-center mt-4 text-sm text-gray-600">
            <p>
  New to Netflix?{' '}
  
  <Link to="/" className="text-blue-500 hover:underline">
    Sign up now
  </Link>.
</p>
            </div>

            {/* reCAPTCHA Disclaimer */}
            <div className="text-center mt-4 text-xs text-gray-600">
              <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#" className="text-blue-500 hover:underline">Learn more</a>.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
