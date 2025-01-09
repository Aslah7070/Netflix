import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { PiWarningOctagon } from "react-icons/pi";
import { PiWarningOctagonFill } from "react-icons/pi";
import { TbUserCircle } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import profile2 from "../../assets/Profile2.jpg"
import { allProfiles, setCurrentProfile } from '../../redux/profile.slice';
import api from '../../axiosInstance/api';

const Account = () => {
    const navigate=useNavigate()
  
   const activeUser=null



   const profiles=useSelector((state)=>state.profile.profiles)
    return (
        <div className="grid grid-cols-12 min-h-screen bg-gray-500   relative  ">
        
          {/* <div className='absolute w-full  flex justify-center items-center   '>
         
          <Outlet className="  "/>
          
          </div> */}
          {/* Sidebar (4 columns) */}
          <div className="col-span-4 bg-gray-100 p-4 flex flex-col items-center">
    
          <div className="flex items-center space-x-2 mt-10">
      <FaArrowLeftLong className="text-2xl" />
      <button
      onClick={()=>navigate("/")}
      className="text-gray-800 font-medium hover:underline">
        Back to Netflix
      </button>
    </div>
    
      <ul className="h-full  pt-10 space-y-8 text-xl  ">
    
        <li className="flex items-center space-x-2">
          <span className="text-2xl">🏠</span>
          <Link to="/overview" className="text-gray-800 no-underline font-medium hover:underline">
            Overview
          </Link>
        </li>
        <li className="flex items-center space-x-2">
          <span className="text-xl">💳</span>
          <Link to="/membership" className="text-gray-800 no-underline font-medium hover:underline">
            Membership
          </Link>
        </li>
        <li className="flex items-center space-x-2">
          <span className="text-xl">🛡️</span>
          <Link to="/security" className="text-gray-800 no-underline font-medium hover:underline">
            Security
          </Link>
        </li>
        <li className="flex items-center space-x-2">
          <span className="text-xl">📱</span>
          <Link to="/devices" className="text-gray-800 no-underline font-medium hover:underline">
            Devices
          </Link>
        </li>
        <li className="flex items-center space-x-2">
          <span className="text-xl">👤</span>
          <Link to="/profiles" className="text-gray-800 no-underline font-medium hover:underline">
            Profiles
          </Link>
        </li>
      </ul>
    </div>
    
    
          {/* Profiles Section (8 columns) */}
          <div className="col-span-8 bg-white  p-10">
            <h2 className="text-4xl font-bold mb-4">Account</h2>
    
            {/* Parental Controls Section */}
            <section className="mb-8">
              <h3 className="text-lg font-medium">Membership details</h3>
              <div className="space-y-1 w-5/6 mt-4 border-2 border-gray-300 rounded-2xl p-1 ">
    
              
                <button onClick={()=>navigate("parentalprofile")} className="w-full p-4   text-left ">
                  <div className='flex items-center space-x-4'>
                  <div >
                   <span className='text-3xl'><PiWarningOctagon/> </span>
                   </div>
                <div  >
                <span className="font-semibold text-xl"> Basic Plans</span>
                  <span className="block text-sm  text-gray-600">
                  Next payment: 5 January 2025
                  </span>
                </div>
                  </div>
                </button>
                <hr />
                <button onClick={()=>navigate("TransfefrProfile")} className="w-full p-4 bg-white rounded-lg text-left">
                   <div className='flex items-center space-x-4'>
                   <div>
                        <span className='text-3xl'><TbUserCircle/></span>
                    </div>
                  <div>
                  <span className="font-semibold text-xl">Manage Membership</span>
                
                  </div>
                   </div>
                </button>
              </div>
            </section>
    
           
            <section >
              <h3 className="text-xl font-medium">Quick Links</h3>

              <section className="mb-8">
             
              <div className="space-y-1 w-5/6 mt-4 border-2 border-gray-300 rounded-2xl p-1 ">
    
              
                <button onClick={()=>navigate("parentalprofile")} className="w-full p-4   text-left ">
                  <div className='flex items-center space-x-4'>
                  <div >
                   <span className='text-3xl'><PiWarningOctagon/> </span>
                   </div>
                <div  >
                <span className="font-semibold text-xl"> Mnage Membership method</span>
                  <span className="block text-sm  text-gray-600">
                  Next payment: 5 January 2025
                  </span>
                </div>
                  </div>
                </button>
                <hr />
                <button onClick={()=>navigate("TransfefrProfile")} className="w-full p-4 bg-white rounded-lg text-left">
                   <div className='flex items-center space-x-4'>
                   <div>
                        <span className='text-3xl'><TbUserCircle/></span>
                    </div>
                  <div>
                  <span className="font-semibold text-xl">change plan</span>
                
                  </div>
                  
                   </div>
 
                </button>
                <hr />
                <button onClick={()=>navigate("TransfefrProfile")} className="w-full p-4 bg-white rounded-lg text-left">
                   <div className='flex items-center space-x-4'>
                   <div>
                        <span className='text-3xl'><TbUserCircle/></span>
                    </div>
                  <div>
                  <span className="font-semibold text-xl">Manage access and plan</span>
                
                  </div>
                  
                   </div>
 
                </button>

                <hr />
                <button onClick={()=>navigate("TransfefrProfile")} className="w-full p-4 bg-white rounded-lg text-left">
                   <div className='flex items-center space-x-4'>
                   <div>
                        <span className='text-3xl'><TbUserCircle/></span>
                    </div>
                  <div>
                  <span className="font-semibold text-xl">Update Password</span>
                
                  </div>
                  
                   </div>
 
                </button>

                <hr />
                <button onClick={()=>navigate("TransfefrProfile")} className="w-full p-4 bg-white rounded-lg text-left">
                   <div className='flex items-center space-x-4'>
                   <div>
                        <span className='text-3xl'><TbUserCircle/></span>
                    </div>
                  <div>
                  <span className="font-semibold text-xl">Tranfer Profile</span>
                
                  </div>
                  
                   </div>
 
                </button>

                <hr />
                <button onClick={()=>navigate("TransfefrProfile")} className="w-full p-4 bg-white rounded-lg text-left">
                   <div className='flex items-center space-x-4'>
                   <div>
                        <span className='text-3xl'><TbUserCircle/></span>
                    </div>
                  <div>
                  <span className="font-semibold text-xl">Adjest Parantal controls</span>
                
                  </div>
                  
                   </div>
 
                </button>

                <hr />
                <button onClick={()=>navigate("TransfefrProfile")} className="w-full p-4 bg-white rounded-lg text-left">
                   <div className='flex items-center space-x-4'>
                   <div>
                        <span className='text-3xl'><TbUserCircle/></span>
                    </div>
                  <div className='flex flex-col'>
                  <span className="font-semibold text-xl">Edit settings</span>
                  <span className="font-semibold text-sm">Language,subtitle,autoplay,notifications,privacy and more</span>
                
                  </div>
                  
                   </div>
 
                </button>
              </div>
            </section>


            <section className="mb-8">
              <h3 className="text-lg font-medium">Membership details</h3>
              <div className="space-y-1 w-5/6 mt-4 border-2 border-gray-300 rounded-2xl p-1 ">
    
              
                <button onClick={()=>navigate("parentalprofile")} className="w-full p-4   text-left ">
                  <div className='flex items-center space-x-4'>
                  <div >
                   <span className='text-3xl'><PiWarningOctagon/> </span>
                   </div>
                <div  >
                <span className="font-semibold text-xl"> Basic Plans</span>
                  <span className="block text-sm  text-gray-600">
                  Next payment: 5 January 2025
                  </span>
                </div>
                  </div>
                </button>
                <hr />
                <button onClick={()=>navigate("TransfefrProfile")} className="w-full p-4 bg-white rounded-lg text-left">
                   <div className='flex items-center space-x-4'>
                   <div>
                        <span className='text-3xl'><TbUserCircle/></span>
                    </div>
                  <div>
                  <span className="font-semibold text-xl">Manage Membership</span>
                
                  </div>
                   </div>
                </button>
              </div>
            </section>
             <div className=' w-5/6 mt-4 border-2 border-gray-300 rounded-2xl p-3'>
                <p className='text-xl'>Manage Profils</p>
                {
                    // profiles&&profiles.map((profile))
                }
             </div>
      
            </section>
            
          </div>
          
    
              
        </div>
      );
}

export default Account
