import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../axiosInstance/api";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
console.log("users",users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Example API endpoint - Replace with your actual API endpoint
        const response = await api.get("/accounts");
        console.log("response",response.data.accounts);
        
        setUsers(response.data.accounts); // 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="admin-user-list">
      <h2 className="text-center my-4">Admin - User List</h2>

      {/* User Table */}
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Email</th>
            {/* <th className="px-4 py-2">Password</th> */}
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Profile Image</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {users?.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No users found
              </td>
            </tr>
          ) : (
            users?.map((user) => (
              <tr key={user._id} className="border-b border-gray-200">
                <td className="px-4 py-2">{user._id}</td>
                <td className="px-4 py-2">{user.email}</td>
                {/* <td className="px-4 py-2">{user.password}</td> */}
                <td className="px-4 py-2">{user.username || "N/A"}</td>
                <td className="px-4 py-2">
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString()}
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

