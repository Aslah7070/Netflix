import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../axiosInstance/api'

const Restrictions = () => {
  const {profileId}=useParams()
  
  const [data,setData]=useState("")
  const [error,setError]=useState("")
  const navigate=useNavigate()
  
  console.log("data",data);
  console.log("error",error);
  

    const activeUser=useSelector((state)=>state.profile.currentProfile)
    console.log("activeUser",activeUser);
    const allProfile=useSelector((state)=>state.profile.Profiles)
    console.log("allProfile",allProfile);
   const selectedProfile=allProfile.find((profile)=>profile._id===profileId)
   console.log("selectedProfile",selectedProfile);
   
const handleSubmit=async()=>{

   try {
    const response=await api.post("/confirmrestrictions",{password:data})

    console.log("response",response);
    if(response.status===200&&response.data.user.email){
      // alert("success")
      navigate(`/viewrestrictions/${selectedProfile._id}`)
      
    }

    setError("")
   } catch (error) {
    console.log("error",error);
    if(error.response.status===400){
    console.log("hello");
    setError("incorrect password")
    
    }else{
      setError("")
    }
    
   }
    
}
   const handleChange=(e)=>{
        setData(e.target.value)
       }
  return (
    <div className='w-full h-screen bg-gray-200 flex flex-col items-center '>
    <form 
      className='w-3/5 h-5/6 space-y-20'
      onSubmit={(e) => {
        e.preventDefault(); 
        
        console.log("Form submitted");
      }}
    >
      <div className='flex py-5 justify-between'> 
        <h1 className='text-5xl'>View Restrictions</h1>
        <img className='w-14' src={selectedProfile?.image} alt="hello" />
      </div>
  
      <p className='text-2xl'>
        Enter your account password to edit Profile Maturity Rating and Title Restrictions for {selectedProfile?.name}'s profile.
      </p>
  
      <div className='flex'>
      <div className='flex flex-col '>
        <input 
          className={`h-12 w-96 mr-10 border-3 ${error ? "border-red-700" : "border-gray-300"}`}
          type="password" 
          placeholder="Enter your password" 
          required 
          onChange={handleChange}
        />
        <span className='text-red-700'>{error}</span>
       
      </div>
      
      <button
      onClick={()=>navigate("/sendemail")}  
      type="button" className='text-xl h-12  text-blue-600 hover:underline'>
          Create or reset password
        </button>
      </div>
  
      <div className='flex items-center justify-center'>
        <button 
        onClick={handleSubmit}
          type="submit" 
          className='text-xl bg-blue-600 border w-28 p-2 px-3 me-2 border-black text-white'
        >
          Continue
        </button>
        <button 
          type="button" 
          className='text-xl bg-gray-400 border w-28 p-2 px-3 border-black'
          onClick={() => navigate(-1)} 
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
  
  )
}

export default Restrictions

