import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoginStatus, setUserData } from '../redux/slice'
import api from '../axiosInstance/api'

const HomePagePremium = () => {
const dispatch=useDispatch()
    // useEffect(()=>{
       
    //     dispatch(setLoginStatus(false))
    // },[])

    const handleLogout=async()=>{
        const response=await api.post("/logout")
        dispatch(setLoginStatus(false))
    }
  return (
    <div>
      <div className='flex justify-between px-10'>
      <div className='flex'>
        <p>Home</p>
        <p>TV Shows</p>
        <p>Movies</p>
        <p>New&Popular</p>
        <p>MyList</p>
        <p>Browse by Language</p>
      </div>
      <div className='flex'>
        <div>search icon</div>
        <div>chidren</div>
        <div>notification</div>
        <div>profile</div>

      </div>
      </div>

      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default HomePagePremium
