import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginStatus, setUserData } from '../redux/slice'
import api from '../axiosInstance/api'
import { useLocation, useParams } from 'react-router-dom'

const HomePagePremium = () => {
 
  // const sessionId  = useParams()
  // console.log("sessionIdwe12345",sessionId);
  
const dispatch=useDispatch()
    // useEffect(()=>{
       
    //     dispatch(setLoginStatus(false))
    // },[])
   const email= useSelector((state)=>state.user.email)
   const amount= useSelector((state)=>state.user.premiumPrice)
   const role= useSelector((state)=>state.user.role)
   console.log("emailluuu ",email);
   console.log("amounttttt ",amount);
   console.log("role ",role);
   

    

    const handleLogout=async()=>{
        const response=await api.post("/logout")
        dispatch(setLoginStatus(false))
    }
  return (
    <div>
      <div className='flex justify-between px-10 '>
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
