// import React, { useState } from "react";
// import { MdOutlineMenu } from "react-icons/md";
// import { FaSignOutAlt } from "react-icons/fa";
// import { HiMiniSquares2X2 } from "react-icons/hi2";
// import { RiMovie2AiFill, RiMoneyRupeeCircleFill } from "react-icons/ri";
// import { IoMdAddCircle } from "react-icons/io";
// import { ImUsers } from "react-icons/im";
// import netflixlog from "../../assets/netflix-logo.png";
// import { useNavigate } from "react-router-dom";
// import api from "../../axiosInstance/api";
// import { useDispatch } from "react-redux";
// import { setLoginStatus } from "../../redux/slice";

// const NavBar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const handleLogOut = async () => {
//     try {
//       const response = await api.post("/adminlogout");
//       if (response.status === 200) {
//         dispatch(setLoginStatus(false));
//         navigate("/");
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <div>
//     {/* Toggle Button for small screens */}
//     <button
//       onClick={toggleSidebar}
//       className="md:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg"
//     >
//       <MdOutlineMenu size={24} />
//     </button>
  
//     <nav className="bg-gray-900 text-gray-300 flex items-center justify-between p-4 z-40">
//       <div className="flex items-center">
//         <img src={netflixlog} alt="Netflix Logo" className="h-10 mr-4" />
//       </div>
  
//       {/* Menu for larger screens */}
//       <div className="hidden md:flex space-x-6">
//         <button
//           onClick={() => navigate("/")}
//           className="flex items-center p-2 hover:bg-gray-800 rounded text-base"
//         >
//           <HiMiniSquares2X2 size={24} className="mr-2" />
//           Dashboard
//         </button>
//         <button
//           onClick={() => navigate("movielisting")}
//           className="flex items-center p-2 hover:bg-gray-800 rounded text-base"
//         >
//           <RiMovie2AiFill size={24} className="mr-2" />
//           Projects
//         </button>
//         <button
//           onClick={() => navigate("adminuserlist")}
//           className="flex items-center p-2 hover:bg-gray-800 rounded text-base"
//         >
//           <ImUsers size={24} className="mr-2" />
//           Users
//         </button>
//         <button
//           onClick={() => navigate("paymentsdetails")}
//           className="flex items-center p-2 hover:bg-gray-800 rounded text-base"
//         >
//           <RiMoneyRupeeCircleFill size={24} className="mr-2" />
//           Payments
//         </button>
//         <button
//           onClick={() => navigate("uploadmovies")}
//           className="flex items-center p-2 hover:bg-gray-800 rounded text-base"
//         >
//           <IoMdAddCircle size={24} className="mr-2" />
//           Add Content
//         </button>
//       </div>
  
//       {/* Log Out Button */}
//       <button
//         onClick={handleLogOut}
//         className="hidden md:flex items-center p-2 bg-red-700 text-white hover:bg-red-800 rounded text-base"
//       >
//         <FaSignOutAlt size={24} className="mr-2" />
//         Log Out
//       </button>
//     </nav>
  
//     {/* Mobile Menu Overlay */}
//     {isOpen && (
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//         onClick={toggleSidebar}
//       >
//         <div className="absolute top-4 left-4 bg-white p-4 rounded-md">
//           <button
//             onClick={() => navigate("dashboard")}
//             className="block w-full text-left hover:bg-gray-800 rounded p-2 text-sm"
//           >
//             Dashboard
//           </button>
//           <button
//             onClick={() => navigate("movielisting")}
//             className="block w-full text-left hover:bg-gray-800 rounded p-2 text-sm"
//           >
//             Projects
//           </button>
//           <button
//             onClick={() => navigate("adminuserlist")}
//             className="block w-full text-left hover:bg-gray-800 rounded p-2 text-sm"
//           >
//             Users
//           </button>
//           <button
//             onClick={() => navigate("paymentsdetails")}
//             className="block w-full text-left hover:bg-gray-800 rounded p-2 text-sm"
//           >
//             Payments
//           </button>
//           <button
//             onClick={() => navigate("uploadmovies")}
//             className="block w-full text-left hover:bg-gray-800 rounded p-2 text-sm"
//           >
//             Add Content
//           </button>
//           <button
//             onClick={handleLogOut}
//             className="block w-full text-left bg-red-700 text-white hover:bg-red-800 rounded p-2 mt-4 text-sm"
//           >
//             Log Out
//           </button>
//         </div>
//       </div>
//     )}
//   </div>
  
//   );
// };

// export default NavBar;
import React, { useState, useEffect } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { RiMovie2AiFill, RiMoneyRupeeCircleFill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import { ImUsers } from "react-icons/im";
import netflixlog from "../../assets/netflix-logo.png";
import { useNavigate } from "react-router-dom";
import api from "../../axiosInstance/api";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../../redux/slice";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Check if screen width is less than or equal to 768px
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogOut = async () => {
    try {
      const response = await api.post("/adminlogout");
      if (response.status === 200) {
        dispatch(setLoginStatus(false));
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      
      <button
        onClick={toggleSidebar}
        className="xm:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg"
      >
        <MdOutlineMenu size={24} />
      </button>

      <nav className="  hidden xm:inline-flex bg-gray-900 text-gray-300 w-full  items-center justify-between p-4 z-40">
        <div className="flex items-center">
          <img src={netflixlog} alt="Netflix Logo" className="h-10 mr-4" />
        </div>

        {/* Menu for larger screens */}
        <div className={` xm:flex  `}>
          <button
            onClick={() => navigate("/")}
            className="flex items-center xm:text-sm md:text-lg p-2 hover:bg-gray-800 rounded text-base"
          >
            <HiMiniSquares2X2 size={24} className="mr-2 hidden md:block" />
            Dashboard
          </button>
          <button
            onClick={() => navigate("movielisting")}
            className="flex items-center xm:text-sm md:text-lg  p-2 hover:bg-gray-800 rounded text-base"
          >
           <RiMovie2AiFill size={24} className="mr-2 hidden md:block" />

            Projects
          </button>
          <button
            onClick={() => navigate("adminuserlist")}
            className="flex items-center xm:text-sm md:text-lg p-2 hover:bg-gray-800 rounded text-base"
          >
            <ImUsers size={24} className="mr-2 hidden md:block" />
            Users
          </button>
          <button
            onClick={() => navigate("paymentsdetails")}
            className="flex items-center xm:text-sm md:text-lg p-2 hover:bg-gray-800 rounded text-base"
          >
            <RiMoneyRupeeCircleFill size={24} className="mr-2 hidden md:block" />
            Payments
          </button>
          <button
            onClick={() => navigate("uploadmovies")}
            className="flex items-center xm:text-sm md:text-lg p-2 hover:bg-gray-800 rounded text-base"
          >
            <IoMdAddCircle size={24} className="mr-2 hidden md:block" />
            Add Content
          </button>
        </div>

        {/* Log Out Button */}
        <button
          onClick={handleLogOut}
          className=" sm:flex items-center p-2 bg-red-700 text-white hover:bg-red-800 rounded text-base"
        >
          <FaSignOutAlt size={24} className="mr-2  md:block xm:text-sm md:text-lg " />
         
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        >
          <div className="absolute top-4 left-4 bg-white p-4 rounded-md">
            <button
              onClick={() => navigate("dashboard")}
              className="block w-full text-left hover:bg-gray-800 rounded p-2 text-sm"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("movielisting")}
              className="block w-full text-left hover:bg-gray-800 rounded p-2 text-sm"
            >
              Projects
            </button>
            <button
              onClick={() => navigate("adminuserlist")}
              className="block w-full text-left hover:bg-gray-800 rounded p-2 text-sm"
            >
              Users
            </button>
            <button
              onClick={() => navigate("paymentsdetails")}
              className="block w-full text-left hover:bg-gray-800 rounded p-2 text-sm"
            >
              Payments
            </button>
            <button
              onClick={() => navigate("uploadmovies")}
              className="block w-full text-left hover:bg-gray-800 rounded p-2 text-sm"
            >
              Add Content
            </button>
            <button
              onClick={handleLogOut}
              className="block w-full text-left bg-red-700 text-white hover:bg-red-800 rounded p-2 mt-4 text-sm"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
