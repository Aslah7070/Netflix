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




// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import api from '../../axiosInstance/api';
// import { setUserData } from '../../redux/slice';

// const Success = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const sessionId = queryParams.get('session_id');

//   const email = useSelector((state) => state.user.email);
//   const amount = useSelector((state) => state.user.premiumPrice);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (sessionId) {
//       const verifyPremium = async () => {
//         try {
//           const response = await api.post(`/verifypremium/${sessionId}`, {
//             email,
//             amount,
//           });
//           const user = response.data.user;
//           dispatch(setUserData(user));
//         } catch (error) {
//           console.error('Error verifying premium:', error);
//         }
//       };
//       verifyPremium();
//     }
//   }, [sessionId, email, amount, dispatch]);

//   const handleNavigate = () => {
//     navigate('/premium-home'); // Redirects to the premium home page
//   };

//   return (
//     <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-purple-500 text-white">
//       <div className="text-center p-8 bg-white text-gray-800 rounded shadow-lg">
//         <h1 className="text-4xl font-bold mb-4">Welcome to Premium!</h1>
//         <p className="text-lg mb-6">
//           Thank you for subscribing. Enjoy exclusive features and a premium experience.
//         </p>
//         <button
//           onClick={handleNavigate}
//           className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition-transform transform hover:scale-105"
//         >
//           Go to Premium Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Success;

