

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

const PrimeNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const query=useSelector((state)=>state.movies.search)
console.log("query",query);

  const email = useSelector((state) => state.user.email);
  const [menuVisible, setMenuVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
//    const [searchVisible, setSearchVisible] = useState(false);
  const [show, setShow] = useState(false);
//   const [searchQuery, setSearchQuery] = useState([]);
const isSearchVisible=useSelector((state)=>state.movies.searchVisibility)
  const primeToken = Cookies.get("premiumToken");
  console.log("token", primeToken);
  console.log("searchVisible", isSearchVisible);

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
    // setSearchQuery(query);

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
  // Check premium status
  useEffect(() => {
    display();
  }, []);

  return (
    <div className="relative w-full bg-gray-950 h-auto overflow-hidden">
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
      {/* Navbar code */}
      <div className="relative z-10 flex md845:flex-row justify-between px-5 py-3 text-white items-center bg-black">
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




