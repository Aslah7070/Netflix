import React from 'react'
import { useSelector } from 'react-redux'
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const ParentalControll = () => {
   const navigate=useNavigate()
   const profiles= useSelector((state)=>state.profile.Profiles)
   const activeUser=useSelector((state)=>state.profile.currentProfile)

   const handleClose=()=>{
    navigate(-1);
   }
  return (
    <div  className=" relative  min-h-[600px] min-w-[1000px] flex flex-col items-center justify-center bg-white h-full mt-32  py-8 shadow-lg  z-20">

<button 
        onClick={handleClose}
        className="absolute top-4 right-2 text-xl font-bold text-black hover:text-gray-700"
      >
        <IoMdClose className='text-4xl'/>
      </button>
     <h1 className='text-center '>Select a profile</h1>
      <div className="bg-white shadow-lg  rounded-lg p-6 w-9/12 h-6/6 border border-black">
      
      {profiles&&profiles.map((profile, index) => (
           <>
              <div
                key={index}
                className="flex items-center justify-between  bg-white p-4 rounded-lg "
                onClick={()=>navigate(`/restrictions/${profile._id}`)}
              >
                <div className="flex items-center space-x-4  w-full">
                 <img className='w-10' src={profile?.image} alt="" />
                <div>
                <span className="font-medium">{profile?.name}</span>
                <p>all maturity ratings</p>
                </div>
                  
                 
       {activeUser?._id===profile?._id && <span className=' ms-auto bg-blue-300 px-3 py-1 rounded-xl '>  Your profile</span>}
                </div>
                
              </div>
              <hr /></>
            ))}
      </div>
    </div>
  )
}

export default ParentalControll
