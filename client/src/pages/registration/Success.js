import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../axiosInstance/api';
import { setUserData } from '../../redux/slice';

const Success = () => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');

    const email= useSelector((state)=>state.user.email)
    const amount= useSelector((state)=>state.user.premiumPrice)
  
    console.log('Session ID:', sessionId);
const dispatch=useDispatch()
const navigete=useNavigate()
    useEffect(()=>{
        try {
       
 
     
        } catch (error) {
         
        }
        
     },[])

     
     const handle=()=>{
try {
    if(sessionId){
        const display=async()=>{
          const response= await api.post(`/verifypremium/${sessionId}`,{email:email,amount:amount})
          console.log("mu prime",response);
          const user=response.data.user
          console.log("priii",user);
          
   //  const user=response.data.primeUser
          dispatch(setUserData(user))
          navigete("/")
      }
        
      display()
     }
} catch (error) {
    console.log("err",error);
    
}
     }
  return (
    <div>
      <button onClick={()=>handle()}>move on</button>
    </div>
  )
}

export default Success
