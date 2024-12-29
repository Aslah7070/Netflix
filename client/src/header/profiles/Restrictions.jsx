import React from 'react'
import { useSelector } from 'react-redux'

const Restrictions = () => {

    const activeUser=useSelector((state)=>state.profile.currentProfile)
    console.log("activeUser",activeUser);
    
  return (
    <div className='w-full h-screen bg-gray-200 flex flex-col items-center '>
     <div className=' w-3/5 h-5/6 space-y-20'>
     <div className='flex py-5 justify-between'> 
      <h1 className='text-5xl '>Viwe Restrictions</h1>
      <img className='w-14' src={activeUser?.image} alt="hello" />
      </div>
      <p className='text-2xl'>Enter your account password to edit Profile Maturity Rating and Title Restrictions for moosa sahad's profile.</p>
      <div>
        <input className='h-12 w-96 mr-10' type="text" />
        <button className='text-xl text-blue-600 hover:underline'>Create or reset password</button>
      </div>

      <div className=' flex items-center justify-center'>
        <button className='text-xl bg-blue-600 border w-28 p-2 px-3 me-2  border-black text-white' >Continue</button>
        <button className='text-xl bg-gray-400 border w-28 p-2 px-3  border-black' >Cancel</button>
      </div>
     </div>
    </div>
  )
}

export default Restrictions
