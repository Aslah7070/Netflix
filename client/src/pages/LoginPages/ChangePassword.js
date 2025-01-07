


import React, { useState } from "react";
import api from "../../axiosInstance/api";
import { useNavigate, useParams } from "react-router-dom";
const Cookies=require("js-cookie")
const ChangePassword = () => {
   
const {id,token}=useParams()

const [data,setData]=useState({
    password:"",
    cpassword:"",
    email:""
})
const [validError,setValidErro]=useState("")
const [validSix,setValidSsix]=useState("")
const navigate=useNavigate()
console.log("id",id);
console.log("token",token);
console.log("dsfds",data.email);

const primeToken=Cookies.get("premiumToken")



 
    const handleVarifyPassword=async(e)=>{
        e.preventDefault()
       try {
        const {password,cpassword,email}=data
        
        if (password !== cpassword) {
            setValidErro("Must match your new password")
            return; 
        }else{
            setValidErro("")
        }
        const response=await api.post(`/verifyforgotpassword/${id}/${token}`,{password:password,email:email})

        console.log(response);
        console.log("status",response.status);

        if(response.status===200&&response.data.message==="password is same"){
            setValidSsix("Sorry, you cannot use a previous password. Please try another password.")
            return
        }else{
            setValidSsix("")
        }
        if(primeToken){

        }else{

          navigate("/")
        }

        
       } catch (error) {
        console.log("error",error);
        
       }
        
    }

    const handlePassword=(e)=>{
        const {name,value}=e.target
        setData((prevState)=>({
            ...prevState,
            [name]:value,
        }))
    }

    const handleBlur=()=>{
        const {password}=data
    
        if(password.length<6){
            console.log("dsfds");
            setValidSsix("Password should be between 6 and 60 characters long.")
            
        }else{
            setValidSsix("")
        }
    }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between ">
      <header className="w-full bg-black text-white p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">NETFLIX</h1>
          <div className="rounded-full bg-blue-500 p-2">
            <span className="text-white">😊</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex justify-evenly items-center w-full    ">
        <div className="bg-white w-full max-w-md p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Change password</h2>
          <p className="text-sm text-gray-600 mb-6">
            Protect your account with a unique password at least 6 characters long.
          </p>

          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Current Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border-gray-300 rounded-md border border-10  p-2 shadow-sm"
                value={data.email}
                onChange={(e)=>handlePassword(e)}
                
              />
            </div>

            <div className="mb-4">
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                New password (6-60 characters)
              </label>
              <input
              onBlur={handleBlur} 
                type="password"
                id="new-password"
                className="w-full border-gray-300 rounded-md border border-10 p-2 shadow-sm"
                 name="password"
                onChange={(e)=>handlePassword(e)}
              />
              <span className="text-red-700">{validSix&&validSix}</span>
            </div>

            <div className="mb-4">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Re-enter new password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="cpassword"
                className="w-full border-gray-300 rounded-md border border-10 p-2 shadow-sm"
                onChange={(e)=>handlePassword(e)}
              />
              <span className="text-red-800">{validError&&validError}</span>
            </div>

            <div className="mb-4">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="mr-2 border-gray-300 rounded"
                />
                Sign out of all devices
              </label>
            </div>

            <div className="flex space-x-4">
              <button
              onClick={handleVarifyPassword}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <main className=" w-96 h-96">
   
               </main>
      </main>


      
    </div>
  );
};

export default ChangePassword;

