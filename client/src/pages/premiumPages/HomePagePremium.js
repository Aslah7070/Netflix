import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from '../../redux/slice';
import api from '../../axiosInstance/api';
import netflixLogo from "../../assets/netflix-logo.png";

import backgroundImage from "../../assets/netflixHomeimage.jpg"; 
import MySwiperComponent from './MoviesAndTvShows';
import SouthIndian from './SouthIndian';
import MyList from './MyList';

const HomePagePremium = () => {
  const dispatch = useDispatch();

  const email = useSelector((state) => state.user.email);
  const role = useSelector((state) => state.user.role);
  const amount = useSelector((state) => state.user.premiumPrice);

  console.log('Email:', email);
  console.log('Role:', role);
  console.log('Amount:', amount);

  const handleLogout = async () => {
    try {
      const response = await api.post('/logout');
      if (response.status === 200) {
        dispatch(setLoginStatus(false));
      }
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
     <div className='w-full h-full'>
     
       <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>


<div className="relative z-10 flex justify-between px-10 py-5 text-white">
  <div className="flex space-x-5">
    <img className="w-20" src={netflixLogo} alt="Netflix Logo" />
    <p>Home</p>
    <p>TV Shows</p>
    <p>Movies</p>
    <p>New & Popular</p>
    <p>My List</p>
    <p>Browse by Language</p>
  </div>
  <div className="flex space-x-5">
    <div>🔍</div>
    <div>🎥</div> 
    <div>🔔</div> 
    <div>👤</div>
  </div>
</div>

{/* Content Section */}
<div className="relative z-10 text-white px-10 mt-20">
  <h1 className="text-4xl font-bold">Welcome, {email || 'Guest'}</h1>
  <p className="text-lg mt-2">
    {role === 'premium'
      ? 'Enjoy unlimited streaming of your favorite movies and TV shows!'
      : 'Upgrade to Premium for the best experience.'}
  </p>
  <button
    onClick={handleLogout}
    className="mt-5 px-6 py-3 bg-red-600 rounded-md hover:bg-red-700"
  >
    Logout
  </button>
</div>
     </div>
      <MySwiperComponent/>
      <SouthIndian/>
      <MyList/>
    </div>
  );
};

export default HomePagePremium;
