import React, { useEffect } from 'react';
import NetflixLogo from "../assets/netflix-logo.png";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { isLogin, setLoginStatus } from '../redux/slice';
import api from '../axiosInstance/api';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
const navigate=useNavigate()
  const email=useSelector((state)=>state.user.isLoggedIn)
  const dispatch=useDispatch()

  console.log("emailss",email);
  
const location=useLocation()
    let a=location.pathname===`/verifyemail`
 
      const active=useSelector((state)=>state.user.isLoggedIn)
   
      
  useEffect(() => {
    const userCookie = Cookies.get("user");
    console.log("userCookie:", userCookie);
     
    if (userCookie) {
      try {
        
        const userJson = userCookie.startsWith("j:") ? userCookie.slice(2) : userCookie;
        const user = JSON.parse(userJson); 
        console.log("Parsed user:", user);
  
        if (user.email) {
          
          
        }
      } catch (error) {
        console.error("Error parsing cookie JSON:", error.message);
      }
    } else {
      console.warn("No user cookie found.");
    }
  }, [dispatch,a]);
  

  const handleSignOut = () => {
    
    const display=async()=>{
        const response=await api.post("/logout")
        console.log(response);
         dispatch(setLoginStatus(false))
         navigate("/")
    }
    display()

  };

  return (
    <div>
      <header className="flex justify-between items-center p-4 border h-24">
        <img className="w-32" src={NetflixLogo} alt="Netflix Logo" />
        <div className="flex items-center space-x-6">
          <select className="bg-transparent h-8 w-24 text-white px-3 py-1 rounded-3xl border border-white cursor-pointer">
            <option>English</option>
            <option>हिंदी</option>
          </select>

          {active ? (
            <button
              className="bg-white h-8 w-24 text-black px-3 py-1 rounded-3xl hover:bg-red-700 transition-all"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            <button className="bg-white h-8 w-20 text-black px-3 py-1 rounded-3xl hover:bg-red-700 transition-all">
              Sign In
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavBar;
