

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from '../../redux/slice';
import api from '../../axiosInstance/api';
import netflixLogo from "../../assets/netflix-logo.png";
import profileImage from "../../assets/Profile1.jpg";
import { setMovies } from '../../redux/movieSlice';
import IndianMovies from './categories/IndianMovies';
import FunMovies from './categories/FunMovies';
import ActionMovies from './categories/ActionMovies';
import HindiMovies from './categories/HindiMovies';
import ThamilMovies from './categories/ThamilMovies';
import { IoSearch } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import UploadTVShowForm from '../../header/Test';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PrimeNavBar from '../../header/PrimeNavBar';




const HomePagePremium = () => {
  const dispatch = useDispatch();

  const email = useSelector((state) => state.user.email);
  const role = useSelector((state) => state.user.role);
  const movies = useSelector((state) => state.movies.movies);
  const backgroundVideo = movies.length > 0 ? movies[0].videoUrl : null;
  const movieName = movies.length > 0 ? movies[0].title : null;
  const rating = movies.length > 0 ? movies[0].rating : null;

  
  const [menuVisible, setMenuVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
const navigate=useNavigate()
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };
  const [show, setShow] = useState(false);
console.log("show",show);

  const handleClosing = () => { 
    setShow(false)
    navigate("/")
  }




    const handleClose = () => {

    navigate("/"); 
  };
  const primeToken=Cookies.get("premiumToken")
  console.log("toekn",primeToken)
  const display=async()=>{
  if(!primeToken){
    setShow(true)
  }else{
    setShow(false)
  }
  
 } 


  useEffect(()=>{
   display()
  },[])
  const handleLogOut= async()=>{
    const response=await api.post("/logout")
    console.log("response",response);
    
    
    dispatch(setLoginStatus(false))
  }


  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("fetchmovies");
        const movies = response.data.data;
        dispatch(setMovies(movies));
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };

    fetchMovies();
  }, [dispatch]);

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

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    
    
    if (query) {
      navigate(`/search?q=${query}`);
    }else{
      navigate("/")
    }
  };
  

  return (
    <div className="relative w-full bg-gray-950 h-auto overflow-hidden">
     
      {show&&(
           <Modal show={show} onHide={handleClose} centered>
           <Modal.Body className="text-center bg-dark text-white p-4">
             <h4 className="fw-bold">Your payment is pending.</h4>
             <p className="mt-3">In the meantime, browse TV shows and movies.</p>
             <Button variant="light" onClick={handleClosing} className="mt-3">
               OK
             </Button>
             <button
               type="button"
               className="btn-close btn-close-white position-absolute top-0 end-0 me-3 mt-3"
               onClick={handleClosing}
               aria-label="Close"
             ></button>
           </Modal.Body>
         </Modal>
      )}
      {backgroundVideo && (
        <video
          className="absolute top-0 left-0 w-full h-screen object-cover"
          src={backgroundVideo}
          autoPlay
          loop
          muted
        ></video>
      )}

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
      <PrimeNavBar/>

      {/* <div className="relative z-10 flex md845:flex-row justify-between px-5 py-3 text-white items-center bg-black">
       
        <div className="flex flex-wrap md845:flex-row space-x-2 md845:space-x-5 items-center">
          <img className="w-16 md845:w-20" src={netflixLogo} alt="Netflix Logo" />
          <button
            className="md845:hidden text-white focus:outline-none border border-white px-2 py-1 rounded"
            onClick={toggleMenu}
          >
            Browse
          </button>
          <nav
            className={`md845:flex md845:space-x-5 ${
              menuVisible
                ? "absolute left-5 top-full mt-2 flex flex-col space-y-2 bg-gray-800 p-3 rounded shadow-lg md845:relative md845:top-auto md845:left-auto"
                : "hidden"
            }`}
          >
            <p className="lg:text-sm md845:text-xs">Home</p>
            <p className="lg:text-sm md845:text-xs">TV Shows</p>
            <p className="lg:text-sm md845:text-xs">Movies</p>
            <p className="lg:text-sm md845:text-xs">New & Popular</p>
            <p className="lg:text-sm md845:text-xs">My List</p>
            <p className="lg:text-sm md845:text-xs">Browse by Language</p>
          </nav>
        </div>


        <div className="flex space-x-5 items-center mt-3 md845:mt-0 relative">
     {
      !searchVisible&&(
        <IoSearch
        className="hidden md845:block w-5 h-5 md845:w-6 md845:h-6 cursor-pointer"
        onClick={toggleSearch}
      />
      )
     }

      <div
        className={`absolute top-0  right-52  w-full max-w-md bg-gray-800 text-white rounded-md shadow-lg transition-all duration-500 ease-in-out ${
          searchVisible ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-full"
        }`}
        style={{ overflowY: "auto" }}
      >
        {searchVisible && (
         <div className='flex items-center'>
          <IoSearch
          className="hidden md845:block w-9 h-5 md845:w-10 md845:h-6 cursor-pointer"
          onClick={toggleSearch}
        />
           <input
            type="text"
            className="w-full px-4  py-2 bg-gray-900 text-white border-none outline-none"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            
            
          />
          
         </div>
        )}
      </div>

      <p className="hidden md845:block md845:text-xs">Children</p>
      <FaBell className="w-5 h-5 md845:w-6 md845:h-6" />
      <div className="relative">
        <img
          className="w-8 h-8 md845:w-10 md845:h-10 cursor-pointer"
          src="https://via.placeholder.com/150"
          alt="Profile"
          onClick={toggleDropdown}
        />
        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg py-2">
            <p className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Children</p>
            <hr className="border-gray-700" />
            <p className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Manage Profiles</p>
            <p className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Transfer Profile</p>
            <p className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Account</p>
            <p className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Help Centre</p>
            <hr className="border-gray-700" />
            <p
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleLogout}
            >
              Sign out of Netflix
            </p>
          </div>
        )}
      </div>
    </div>
      </div> */}

      {/* Greeting Section */}
      <div className="relative flex justify-between items-center z-10 text-white px-10 mt-96 py-5">
  <div className="flex flex-col space-y-4">
    <h1 className="text-4xl font-bold">{movieName || 'Guest'}</h1>
    <div className="flex space-x-5">
      <button className="flex items-center px-4 py-2 text-sm bg-white text-black rounded-md hover:bg-red-700 sm:px-6 sm:py-3 sm:text-base">
        <FaPlay className="mr-1 sm:mr-2" />
        Play
      </button>
      <button className="flex items-center px-4 py-2 text-sm bg-gray-500 text-black rounded-md hover:bg-red-700 sm:px-6 sm:py-3 sm:text-base">
        <PiWarningCircle className="mr-1 sm:mr-2" />
        More Info
      </button>
      <button onClick={handleLogOut}>
        logout
      </button>
    </div>
  </div>
  <div className="text-xl  text-gray-300">
  <span className='border border-1 px-5 py-2'>{rating}</span>
  </div>
</div>


      <div className="relative z-10 bg-opacity-90 text-white space-y-8 pt-8">
        <IndianMovies />
        <FunMovies />
        <ActionMovies />
        <HindiMovies />
        <ThamilMovies />
        
      </div>
    </div>
  );
};

export default HomePagePremium;
