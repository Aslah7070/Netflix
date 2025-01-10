// // import React from 'react';
// // import { FaHome } from "react-icons/fa";
// // import { ImUsers } from "react-icons/im";
// // import { RiMovie2AiFill } from "react-icons/ri";
// // import { FaCalendarAlt } from "react-icons/fa";
// // import { MdOutlineSubscriptions } from "react-icons/md";
// // import { SiNginxproxymanager } from "react-icons/si";
// // import { MdContentCut } from "react-icons/md";
// // import netflixlog from "../../assets/netflix-logo.png";
// // import api from '../../axiosInstance/api';
// // import { Outlet, useNavigate } from 'react-router-dom';
// // import { useDispatch } from 'react-redux';
// // import { setLoginStatus } from '../../redux/slice';

// // const AdminHome = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const handleLogOut = async () => {
// //     const response = await api.post("/adminlogout");
// //     console.log("response", response);
// //     dispatch(setLoginStatus(false));
// //     navigate("/");
// //   }

// //   const handleListUsers = () => {
// //     navigate("adminuserlist");
// //   }

// //   return (
// //     <div className="container-fluid ">
    

// //       <div className="row h-screen">
// //         {/* Sidebar */}
// //         <div className="col-12 col-md-3 bg-dark text-white p-4 d-flex flex-col justify-between">
          
// //           <nav>
// //           <div className="mb-4">
// //             <img src={netflixlog} alt="Logo" className="w-25" />
// //           </div>
// //             <ul className="list-unstyled ">
// //               <li className="d-flex align-items-center p-2 mb-3  rounded cursor-pointer">
// //                 <span className="fs-2"><FaHome /></span>
// //                 <span className="ms-3 fs-3">Dashboard</span>
// //                 <span className="ms-auto bg-dark text-white rounded-pill px-2 py-1 small">5</span>
// //               </li>
// //               <li onClick={handleListUsers} className="d-flex align-items-center p-2 mb-3  rounded cursor-pointer">
// //                 <span className="fs-3"><ImUsers /></span>
// //                 <span className="ms-3 fs-3">Users</span>
// //               </li>
// //               <li
// //               onClick={()=>navigate("movielisting")}
// //               className="d-flex align-items-center p-2 mb-3  rounded cursor-pointer">
// //                 <span className="fs-3"><RiMovie2AiFill /></span>
// //                 <span className="ms-3 fs-3">Projects</span>
// //                 <span className="ms-auto bg-dark text-white rounded-pill px-2 py-1 small">12</span>
// //               </li>
// //               <li className="d-flex align-items-center p-2 mb-3  rounded cursor-pointer">
// //                 <span className="fs-3"><FaCalendarAlt /></span>
// //                 <span className="ms-3 fs-3">Calendar</span>
// //                 <span className="ms-auto bg-dark text-white rounded-pill px-2 py-1 small">20+</span>
// //               </li>
// //               <li className="d-flex align-items-center p-2 mb-3  rounded cursor-pointer">
// //                 <span className="fs-3"><MdOutlineSubscriptions /></span>
// //                 <span className="ms-3 fs-3">Subscription and Billing</span>
// //               </li>
// //               <li className="d-flex align-items-center p-2 mb-3  rounded cursor-pointer">
// //                 <span className="fs-3"><SiNginxproxymanager /></span>
// //                 <span className="ms-3 fs-3">Platform Management</span>
// //               </li>
// //               <li className="d-flex align-items-center p-2 mb-3  rounded cursor-pointer">
// //                 <span className="fs-3"><MdContentCut /></span>
// //                 <span className="ms-3 fs-3">Content Management</span>
// //               </li>
// //             </ul>
// //           </nav>

// //           {/* Teams Section */}
// //           <div className="mt-4">
// //             <h3 className="text-white-50 fs-6 mb-2">Your teams</h3>
// //             <ul className="list-unstyled">
// //               <li className="d-flex align-items-center p-2 mb-3  rounded cursor-pointer">
// //                 <span className="bg-dark text-white p-2 rounded-circle">H</span>
// //                 <span className="ms-3">Heroicons</span>
// //               </li>
// //               <li className="d-flex align-items-center p-2 mb-3  rounded cursor-pointer">
// //                 <span className="bg-dark text-white p-2 rounded-circle">T</span>
// //                 <span className="ms-3">Tailwind Labs</span>
// //               </li>
// //               <li onClick={handleLogOut} className="d-flex align-items-center p-2 mb-3  rounded cursor-pointer">
// //                 <span className="bg-dark text-white p-2 rounded-circle">W</span>
// //                 <span className="ms-3">LOGOUT</span>
// //               </li>
// //             </ul>
// //           </div>
// //         </div>

// //         {/* Main Content */}
// //         <div className="col-12 col-md-9 bg-light text-dark p-4 h-screen">
// //           <h2 className="fs-3 fw-semibold">Welcome to the Admin Panel</h2>
// //           <p className="mt-3">Here you can manage the users, projects, calendar, and more.</p>
// //           <Outlet/>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminHome;





import React from 'react'
import Sidebar from './SideBar'
import { Outlet } from 'react-router-dom'

const AdminHome = () => {
  return (
    <div className="container-fluid">

      <div className="row">

        <div className="col-md-3 col-lg-2 p-0">
          <Sidebar/>


        </div>


        <div className="col-md-9 col-lg-10">
          <div className="p-4">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome

