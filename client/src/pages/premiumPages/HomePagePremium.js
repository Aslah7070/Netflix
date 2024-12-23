

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from '../../redux/slice';
import api from '../../axiosInstance/api';
import { setMovies } from '../../redux/movieSlice';
import IndianMovies from './categories/IndianMovies';
import FunMovies from './categories/FunMovies';
import ActionMovies from './categories/ActionMovies';
import HindiMovies from './categories/HindiMovies';
import ThamilMovies from './categories/ThamilMovies';

import { PiWarningCircle } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";

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


  return (
    <div className="relative w-full bg-gray-950 h-full overflow-hidden pb-16 ">
     
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
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
      <PrimeNavBar/>

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


      <div className="relative z-10 bg-opacity-90 text-white space-y-8 pt-8 mt-24">
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
