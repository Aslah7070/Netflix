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
const ManageProfiles = () => {
const navigate=useNavigate()
    const profiles=useSelector((state)=>state.profile.Profiles)
console.log("profilesppppppp",profiles);

  
   const activeUser= useSelector((state)=>state.profile.currentProfile)
   console.log("activeUser",activeUser);
   const dispatch=useDispatch()

 


   useEffect(() => {
    const getCurrentProfile = async () => {
      try {
        const response = await api.get("/getcurrentprofile");
        console.log("response form", response.data);
  
        // Ensure response structure matches what you are expecting
        if (response.data.success && response.data.currentProfile) {
          dispatch(setCurrentProfile(response.data.currentProfile));
        } else {
          console.log("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching current profile:", error.response || error.message || error);
      }
    };
  
    getCurrentProfile();
  }, []); 
  


const display=async()=>{
      
  try {
    const response=await api.get("/getallprofiles")
 console.log("all profiles",response.data.allProfile);
 
 dispatch(allProfiles(response.data.allProfile))
  } catch (error) {
    console.log("error",error);
    
  }

}
 useEffect(()=>{  
  display() 
 },[])
const handlAddProfile=()=>{
  console.log("hrkkdis");
  
  navigate("addprofile")
}
  return (
    <div className="grid grid-cols-12 min-h-screen bg-gray-500   relative  ">
    
      <div className='absolute w-full  flex justify-center items-center   '>
     
      <Outlet className="  "/>
      
      </div>
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
        <h2 className="text-4xl font-bold mb-4">Profiles</h2>

        {/* Parental Controls Section */}
        <section className="mb-8">
          <h3 className="text-lg font-medium">Parental controls and permissions</h3>
          <div className="space-y-1 w-5/6 mt-4 border-2 border-gray-300 rounded-2xl p-1 ">

          
            <button onClick={()=>navigate("parentalprofile")} className="w-full p-4   text-left ">
              <div className='flex items-center space-x-4'>
              <div >
               <span className='text-3xl'><PiWarningOctagon/> </span>
               </div>
            <div  >
            <span className="font-semibold text-xl"> Adjust parental controls</span>
              <span className="block text-sm  text-gray-600">
                Set maturity ratings, block titles
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
              <span className="font-semibold text-xl">Transfer a profile</span>
              <span className="block text-sm text-gray-600">
                Copy a profile to another account
              </span>
              </div>
               </div>
            </button>
          </div>
        </section>

       
        <section onClick={handlAddProfile}>
          <h3 className="text-xl font-medium">Profile settings</h3>
          <div className="space-y-4 mt-4 w-5/6 border border-black rounded-lg">
            {profiles&&profiles.map((profile, index) => (
              <div
              onClick={(e) => {
                e.stopPropagation(); 
                navigate(`/profilesettings/${profile._id}`);
              }}
                key={index}
                className="flex items-center justify-between  bg-gray-100 p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4  w-full">
                 <img className='w-8' src={profile?.image} alt="" />
                  <span className="font-medium">{profile?.name}</span>
                 
       {activeUser?._id===profile?._id && <span className=' ms-auto bg-blue-300 px-3 py-1 rounded-xl '>  your profile</span>}
                </div>
                
              </div>
            ))}
            
            {(profiles?.length===undefined||profiles?.length<=4)&&(
             <>
              <button onClick={handlAddProfile}  className="w-full mt-4 bg-white py-4 rounded-lg cursor-pointer z-0">
              Add Profile
            </button>
             <div className='w-full text-center'>
             <span >Add up to 5 profiles for anyone who lives with you.</span>
             </div>
             </>
            )}


          </div>
  
        </section>
        
      </div>
      

          
    </div>
  );
};

export default ManageProfiles;
