

import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "../redux/slice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import netflixLogo from "../assets/netflix-logo.png";
import api from "../axiosInstance/api";
import { searchQuery, searchVisible } from "../redux/movieSlice";
import profileImage from "../../src/assets/Profile1.jpg"
import children from "../../src/assets/children.avif"
import profile2 from "../../src/assets/Profile2.jpg"
import { MdOutlineEdit } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { allProfiles, setAvatars, setCurrentProfile } from "../redux/profile.slice";

const PrimeNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
const query=useSelector((state)=>state.movies.search)
const profiles=useSelector((state)=>state.profile.Profiles)
const activeProfile=useSelector((state)=>state.profile.currentProfile)
console.log("activeProfile",activeProfile);
console.log("query",query);
console.log("profilesssss",profiles);

  const email = useSelector((state) => state.user.email);
  const [menuVisible, setMenuVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [show, setShow] = useState(false);
   
const isSearchVisible=useSelector((state)=>state.movies.searchVisibility)
  const primeToken = Cookies.get("premiumToken");
  console.log("token", primeToken);
  console.log("searchVisible", isSearchVisible);

  useEffect(()=>{ 
   try {
    const display=async()=>{
      const response=await api.get("/getallprofiles")
     console.log("all profiles",response.data.allProfile);
     
     dispatch(allProfiles(response.data.allProfile))
 
   }
   display()
 
   } catch (error) {
    console.log("ddddddd",error);
    
   }
  },[])

  useEffect(()=>{
      const display=async()=>{
        const response=await api.get("/getavatar")
        console.log("response form avatars",response.data[0].avatar);
        dispatch(setAvatars(response.data[0].avatar))
      }
     display()
     
  },[])


  
  useEffect(()=>{
    const getCurrentProfile=async()=>{
      const response=await api.get("/getcurrentprofile")
      console.log("response form",response.data.user.currentProfile);
      dispatch(setCurrentProfile(response.data.user.currentProfile))
    }
    getCurrentProfile()
   
},[])
  

  const display = async () => {
    if (!primeToken) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const toggleSearch = () => {
    
    dispatch(searchVisible(!isSearchVisible))
  };

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    dispatch(searchQuery(query))
  

    if (query) {
      navigate(`/search?q=${query}`);
    }else{
        navigate("/")
    }
  };
  

  const handleLogOut = async () => {
    const response = await api.post("/logout");
    console.log("response", response);

    dispatch(setLoginStatus(false));
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleClosing = () => {
    setShow(false);
    navigate("/");
  };
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    display();
  }, []);


  const handleCurrentProfile=async(profileId)=>{
 

     const response=await api.post("/currentprofile",{profileId:profileId})
     console.log("current profile",response.data.user.currentProfile);
     dispatch(setCurrentProfile(response.data.user.currentProfile))
     
  }

  return (
    <div className="relative w-full bg-gray-950 h-auto ">
      {show && (
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
      <div className="relative z-10 flex md845:flex-row justify-between px-5 py-3 text-white items-center bg-black">
        <div className="flex flex-wrap md845:flex-row space-x-2 md845:space-x-5 items-center">
          <img className="w-16 md845:w-20 lg:w-32" src={netflixLogo} alt="Netflix Logo" />
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
            <p className="lg:text-lg md845:text-xs">Home</p>
            <p className="lg:text-lg md845:text-xs">TV Shows</p>
            <p className="lg:text-lg md845:text-xs">Movies</p>
            <p className="lg:text-lg md845:text-xs">New & Popular</p>
            <p className="lg:text-lg md845:text-xs">My List</p>
            <p className="lg:text-lg md845:text-xs">Browse by Language</p>
          </nav>
        </div>

        <div className="flex  space-x-5 items-start justify-center mt-3 md845:mt-0 relative">
          {!isSearchVisible && (
            <IoSearch
              className="hidden md845:block w-5 h-5 md845:w-6 md845:h-6 cursor-pointer"
              onClick={toggleSearch}
            />
          )}
        <div
            className={`absolute top-0 right-52 w-full max-w-md bg-gray-800 text-white rounded-md shadow-lg transition-all duration-500 ease-in-out ${
                isSearchVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform -translate-x-full"
            }`}
            style={{ overflowY: "auto" }}
          >
            {isSearchVisible && (
              <div className="flex items-center">
                <IoSearch
                  className="hidden md845:block w-9 h-5 md845:w-10 md845:h-6 cursor-pointer"
                  onClick={toggleSearch}
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-900 text-white border-none outline-none"
                  placeholder="Search..."
                  value={query}
                  onChange={handleSearchChange}
                />
              </div>
            )}
          </div>

          <p className="hidden md845:block md845:text-xs lg:text-lg">Children</p>
          <FaBell className="w-5 h-5 md845:w-6 md845:h-6" />
          <div className="relative z-10">
            <img
              className="w-8  h-8  cursor-pointer"
              src={activeProfile?.image||profile2}
              alt={activeProfile?.name}
              onClick={toggleDropdown}       
            />
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-72 bg-black text-white rounded-md shadow-lg p-3 pt-5 py-2 z-50">
              {profiles&&profiles.map((profile) => (
                <div className="flex" key={profile._id} onClick={()=>handleCurrentProfile(profile._id)}>
                  <img
                    className="w-10 h-10"
                    src={profile.image ||profile2} 
                    alt={profile.name}
                  />
                  <p className="px-4 py-2 hover:underline cursor-pointer">{profile.name}</p>
                </div>
              ))}
              <div className="flex">
                <img className="w-10  h-10" src={children} alt="" />  <p className="px-4 py-2 hover:underline cursor-pointer">Children</p>
                </div>   
              <hr className="border-gray-700" />
              <div className="flex items-center" onClick={()=>navigate("/manageprofile")}>
                <span className="text-lg text-white">
                  <MdOutlineEdit className="text-2xl" />
                </span>
                <p  className="hover:underline cursor-pointer px-4 rounded">Manage Profiles</p>
              </div>
              <div className="flex">
                <span>
                  <CgProfile className="text-2xl" />
                </span>
                <p className="px-4 hover:underline cursor-pointer">Account</p>
              </div>
              <div className="flex">
                <span>
                  <IoMdHelpCircleOutline className="text-2xl" />
                </span>
                <p className="px-4 hover:underline cursor-pointer">Help Centre</p>
              </div>
              <hr className="border-gray-700" />
              <p
                className="px-4 py-2 hover:underline cursor-pointer"
                onClick={handleLogOut}
              >
                Sign out of Netflix
              </p>
            </div>
            
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimeNavBar;




