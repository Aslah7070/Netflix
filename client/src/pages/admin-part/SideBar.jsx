

import React, { useState } from "react";
import { MdContentCut, MdOutlineMenu, MdOutlineSubscriptions } from "react-icons/md"; 
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiMovie2AiFill } from "react-icons/ri";
import { ImUsers } from "react-icons/im";
import { SiNginxproxymanager } from "react-icons/si";
import { IoMdAddCircle } from "react-icons/io";
import netflixlog from "../../assets/netflix-logo.png";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); 
const navigate=useNavigate()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg"
      >
        <MdOutlineMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-gray-300 w-72 transform transition-transform duration-300 pt-5 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        {/* Profile Section */}
        <div className=" text-center flex flex-col items-center  ">
          <img
            src={netflixlog}
            alt="Profile"
            className=" h-16  border-4 border-gray-700 shadow-md"
          />
          <h2 className="text-xl font-semibold text-blue-500 mt-4">Aslah.C</h2>
          <p className="text-sm text-gray-400">Administrator</p>
        </div>

        {/* Navigation Menu */}
        <nav className="w-full px-4 space-y-3 flex flex-col items-center">
          <div 
          onClick={()=>navigate("/")}
          className="block w-full text-center no-underline">
            <div className="flex  items-center justify-center border border-white  py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition">
              <HiMiniSquares2X2 size={25} />
              <span className="mt-1 text-xl">Dashboard</span>
            </div>
          </div>

          <div to="/products" className="block w-full text-center no-underline">
            <div
            onClick={()=>navigate("movielisting")}
            className="flex  items-center justify-center border border-white  py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <RiMovie2AiFill size={25}/>
              <span className="mt-1 text-xl">Projects</span>
            </div>
          </div>

          <div  className="block w-full text-center no-underline">
            <div
            onClick={()=>navigate("adminuserlist")}
            className="flex  items-center justify-center border border-white  py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <ImUsers size={25}/>
              <span className="mt-1 text-xl">Users</span>
            </div>
          </div>

          <div to="/adminorders" className="block w-full text-center no-underline">
            <div className="flex  items-center justify-center border border-white  py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <MdOutlineSubscriptions size={25}/>
              <span className="mt-1 text-xl">Subscription</span>
            </div>
          </div>

          <div to="/adminorders" className="block w-full text-center no-underline">
            <div className="flex  items-center justify-center border border-white  py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <SiNginxproxymanager size={25}/>
              <span className="mt-1 text-xl">Platform Management</span>
            </div>
          </div>
          <div className="block w-full text-center no-underline">
            <div className="flex  items-center justify-center border-white  py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <MdContentCut size={25}/>
              <span className="mt-1 text-xl">Content Management</span>
            </div>
          </div>

          <div 
          onClick={()=>navigate("uploadmovies")}
          className=" block w-full text-center no-underline">
            <div className="flex  items-center justify-center py-3 border border-white  text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition">

               <IoMdAddCircle size={25}/>
              <span className="mt-1 text-xl">Add Content</span>
            </div>
          </div>


          {/* Logout Button */}
          <div
     
            className="flex  items-center justify-center   border border-white py-3 w-52 text-red-700 hover:bg-red-900 mt-5  hover:text-white  rounded-lg transition cursor-pointer"
          >
            <FaSignOutAlt size={25} />
            <span className="mt-1 text-xl">Log Out</span>
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;

