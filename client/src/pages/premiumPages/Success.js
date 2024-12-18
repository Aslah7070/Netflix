

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserData } from "../../redux/slice";
import api from "../../axiosInstance/api";

const WelcomePage = () => {


      const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');
  const email = useSelector((state) => state.user.email);
  const amount = useSelector((state) => state.user.premiumPrice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle the action of verifying the user's premium status
  const verifyPremium = async () => {
    try {
      if(sessionId){
        
          const display=async()=>{
            const response= await api.post(`/verifypremium/${sessionId}`,{email:email,amount:amount})
            console.log("mu prime",response);
            const user=response.data.user
            console.log("priii",user);
            
     
            dispatch(setUserData(user))
            navigate("/")
        }
          
        display()
       }
  } catch (error) {
      console.log("err",error);
      
  }
  };







  useEffect(() => {
    // Add any initial logic here if necessary
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center flex-col">
      <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/5e0ea5c7-bf74-4b2b-b389-05ff5b290c9a/5a4fd2f7-5877-4095-972f-b9de9bb320c2/NG-en-2023-01-19.jpg')" }}></div>

      <div className="relative z-10 text-center px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Netflix</h1>
        <p className="text-lg md:text-2xl mb-6">Enjoy unlimited movies and TV shows!</p>
        <div className="cta-container">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition-transform hover:scale-105"
            onClick={verifyPremium}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
