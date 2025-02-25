import React, { useState, useEffect } from "react";
import api from "../../axiosInstance/api";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../../redux/slice";
import { useNavigate } from "react-router-dom";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let accounts = useSelector((state) => state.user.users);

 accounts= accounts.filter((account)=>account.role!=="admin")


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
  }, [dispatch]);

  const handleViewDetails = (userId) => {
    navigate(`/userdetails/${userId}`);
  };

  return (
    <div className="admin-user-list p-6 bg-gray-100 min-h-screen">
     <div className='flex justify-between'>
      <h1 className=" text-sm  md:text-xl font-bold text-gray-800 mb-6">Users Listing</h1>
      <span className="text-sm  md:text-xl font-bold">Total Users: {accounts.length}</span>

      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Email</th>
              {/* <th className="px-4 py-2 text-left">Username</th> */}
              <th className="px-4 py-2 text-left">Profile Image</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Creation Date</th>
              <th className="px-4 py-2 text-left">Action</th>
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
                <tr
                  key={user._id}
                  className="border-b border-gray-200 odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  {/* <td className="px-4 py-2">{user.username || "N/A"}</td> */}
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
                      className="bg-blue-600 px-3 py-1 text-white rounded-lg"
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
    </div>
  );
};

export default AdminUserList;
