

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosInstance/api';
import { useSelector } from 'react-redux';

const SignUpPage = () => {
  const navigate = useNavigate();
const emailFromStore=useSelector((state)=>state.user.email)
console.log("value",emailFromStore);

  // Single state for all input fields
  const [formData, setFormData] = useState({
    email: emailFromStore || '',
    password: '',
  });
console.log("Fd",formData);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await api.post("/signup",formData);
      console.log("Response:", response.data.success);
 if(response.data.success){

   navigate("/verifyemail")
 }
      // navigate('/next-step'); 
    } catch (error) {
     

      console.error("Error during sign-up:", error);
    }
  };

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
            <div className="mb-4">
              <input
                type="password"
                name="password" // Match with state field
                className="w-full h-16 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-red-600"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

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
