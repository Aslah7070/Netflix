import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../axiosInstance/api'
import { useSelector } from 'react-redux'

const Profilelock = () => {
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
        navigate(`/profilepinrequire/${selectedProfile._id}`)
        
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
   
    <div className='w-full h-full bg-gray-200 flex flex-col items-center '>
    <form 
      className='w-3/5 h-5/6 space-y-20'
      onSubmit={(e) => {
        e.preventDefault(); 
        
        console.log("Form submitted");
      }}
    >
      <div className='flex py-5 justify-between'> 
        <h1 className='text-5xl'>Profile Lock</h1>
        <img className='w-14' src={selectedProfile?.image} alt="hello" />
      </div>
  
     
      <p>Enter your account password to edit Profile Lock for anu's profile.</p>
  
      <div className=' md:flex justify-start w-full'>

  <div className='flex flex-col bg-red-500 w-3/5'>
    <input 
      className={`h-12 w-full min-w-[200px] border-3 ${error ? "border-red-700" : "border-gray-300"}`}
      type="password" 
      placeholder="Enter your password" 
      required 
      onChange={handleChange}
    />
    <span className='text-red-700'>{error}</span>
  </div>

  <button
    onClick={() => navigate("/sendemail")}  
    type="button" 
    className='lg:text-xl h-12 md:text-sm sm:text-xs text-blue-600 hover:underline'
  >
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

export default Profilelock
