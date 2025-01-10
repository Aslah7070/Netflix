

import React, { useState } from "react";
import api from "../../axiosInstance/api";
import { useDispatch } from "react-redux";
import { setLoginStatus, setUserData } from "../../redux/slice";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

    const[formData,setFormData]=useState({email:"",password:""})
    const navigate=useNavigate()
    const dispatch= useDispatch()
    const handleChange=(e)=>{
const {name,value}=e.target
setFormData((pre)=>({
    ...pre,
    [name]:value
    }))


    }
    const handleSubmit = async (e) => {
        e.preventDefault(); 
      
        try {
         
          const response = await api.post("/adminlogin", { formData });
          console.log("Response on admin login:", response);
          const user = response.data.uset
          dispatch(setUserData(user))
          dispatch(setLoginStatus(true));
          navigate("/adminhome")

        } catch (error) {
    
          console.error("Error during admin login:", error);
        }
      };
      

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
     
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>

    
      <div className="relative bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-red-600 text-4xl font-bold tracking-wide">Netflix Admin</h1>
        </div>

     
        <form 
        onSubmit={handleSubmit}
        className="space-y-6">
 
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
            name="password"
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

        
          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-gray-400 hover:text-gray-200">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
