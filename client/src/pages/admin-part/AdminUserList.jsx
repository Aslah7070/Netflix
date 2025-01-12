// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import api from "../../axiosInstance/api";
// import { useDispatch, useSelector } from "react-redux";
// import { setAllUsers } from "../../redux/slice";
// import { Modal, Button } from "react-bootstrap";

// const AdminUserList = () => {
//   const [users, setUsers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [profile,SetProfile]=useState([])
// console.log("users",users);
// console.log("profile",profile);
// const dispatch=useDispatch()
// const accounts=useSelector((state)=>state.user.users)
// console.log("accounts",accounts);


//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
        
//         const response = await api.get("/accounts");
//         console.log("response",response.data.accounts);
        
//         setUsers(response.data.accounts); 
//         dispatch(setAllUsers(response.data.accounts))
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleViewDetails=async(userId)=>{
//     setShowModal(true)
//     const response=await api.get(`/getprofilebyuserId/${userId}`)

//      console.log("response",response);
//      SetProfile(response.data.profile)

     
//   }
// const handleModalClose=()=>{
//   setShowModal(false)
// }
//   return (
//     <div className="admin-user-list">
//       <h2 className="text-center my-4">User List</h2>

//       {showModal && (
//         <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
//         <div className="flex flex-col items-center">
//           {/* Display Profile Image */}
//           <img
//             src={profile.image || 'https://via.placeholder.com/150'}
//             alt={profile.name || 'User'}
//             className="w-32 h-32 rounded-full object-cover mb-4"
//           />
  
//           {/* Display Profile Name */}
//           <h2 className="text-xl font-semibold mb-2">{profile.name || 'Unknown User'}</h2>
  
//           {/* Additional Profile Details */}
//           <div className="text-gray-600 text-center">
//             <p>
//               <strong>User ID:</strong> {profile.user || 'N/A'}
//             </p>
//             <p>
//               <strong>Created At:</strong>{' '}
//               {new Date(profile.createdAt).toLocaleDateString() || 'N/A'}
//             </p>
//             <p>
//               <strong>Updated At:</strong>{' '}
//               {new Date(profile.updatedAt).toLocaleDateString() || 'N/A'}
//             </p>
//             <p>
//               <strong>Pin Number:</strong> {profile.pinNumber || 'Not Set'}
//             </p>
//           </div>
//         </div>
//       </div>
//       )}
//       {/* User Table */}
//       <table className="table-auto w-full text-left border-collapse">
//         <thead>
//           <tr className="bg-gray-800 text-white">
//             <th className="px-4 py-2">User ID</th>
//             <th className="px-4 py-2">Email</th>
//             {/* <th className="px-4 py-2">Password</th> */}
//             <th className="px-4 py-2">Username</th>
//             <th className="px-4 py-2">Profile Image</th>
//             <th className="px-4 py-2">Role</th>
//             <th className="px-4 py-2">Creation Date</th>
//             <th className="px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {accounts?.length === 0 ? (
//             <tr>
//               <td colSpan="7" className="text-center py-4">
//                 No users found
//               </td>
//             </tr>
//           ) : (
//             accounts?.map((user) => (
//               <tr key={user._id} className="border-b border-gray-200">
//                 <td className="px-4 py-2">{user._id}</td>
//                 <td className="px-4 py-2">{user.email}</td>
//                 {/* <td className="px-4 py-2">{user.password}</td> */}
//                 <td className="px-4 py-2">{user.username || "N/A"}</td>
//                 <td className="px-4 py-2">
//                   <img
//                     src={user.image}
//                     alt="Profile"
//                     className="w-12 h-12 object-cover rounded-full"
//                   />
//                 </td>
//                 <td className="px-4 py-2">{user.currentPlan}</td>
//                 <td className="px-4 py-2">
//                   {new Date(user.createdAt).toLocaleDateString()}
//                 </td>
//                 <td 
//                 onClick={()=>handleViewDetails(user._id)}
//                 className="px-4 py-2">
//                   <button className="bg-blue-600 px-2 text-white rounded-lg">View</button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminUserList;



import React, { useState, useEffect } from "react";

import api from "../../axiosInstance/api";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../../redux/slice";
import { useNavigate } from "react-router-dom";




const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [profile, SetProfile] = useState([]);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const accounts = useSelector((state) => state.user.users);
  console.log("profile",profile);
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/accounts");
        setUsers(response.data.accounts);
        dispatch(setAllUsers(response.data.accounts));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleViewDetails = async (userId) => {
    navigate(`/userdetails/${userId}`)
    // try {
    //   console.log("hello",userId);
      
    //   const response = await api.get(`/getprofilebyuserId/${userId}`);
    //   SetProfile(response.data.profile);
    // } catch (error) {
    //   console.error("Error fetching profile:", error);
    // }
  };

  

  return (
    <div className="admin-user-list relative">
      <h2 className="text-center my-4">User List</h2>

      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Profile Image</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Creation Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts?.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No users found
              </td>
            </tr>
          ) : (
            accounts?.map((user) => (
              <tr key={user._id} className="border-b border-gray-200">
                <td className="px-4 py-2">{user._id}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.username || "N/A"}</td>
                <td className="px-4 py-2">
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="px-4 py-2">{user.currentPlan}</td>
                <td className="px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleViewDetails(user._id)}
                    className="bg-blue-600 px-2 text-white rounded-lg"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
