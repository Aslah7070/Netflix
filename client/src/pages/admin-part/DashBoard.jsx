import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../axiosInstance/api';
import { setAllPayments, setAmount } from '../../redux/adminSlice';

const Dashboard = () => {

     const dispatch=useDispatch()
    const accounts=useSelector((state)=>state.user.users)
    const movies=useSelector((state)=>state.movies.movies)
    const totalAmount=useSelector((state)=>state.admin.totlaAmount)
    const allPayments=useSelector((state)=>state.admin.allPayments)
console.log("accounts",accounts?.length);
console.log("movies",movies?.length);
console.log("totalAmount",totalAmount);
console.log("allPayments",allPayments);

const finAllPayment=async()=>{
    const response=await api.get("/getallpayments")
    console.log("response on payment",response.data);
    let totalAmount=response.data.totalAmount
    let payments=response.data.payments
dispatch(setAllPayments(payments))

dispatch(setAmount(totalAmount))
    

}  

useEffect(()=>{
    finAllPayment()
},[])
  return (
    <div>
        
        <main className="p-6 overflow-y-auto">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">Total Users</h2>
              <p className="text-2xl font-bold text-blue-600">{accounts?.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">Revenue</h2>
              <p className="text-2xl font-bold text-green-600">₹{totalAmount}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">Total movies</h2>
              <p className="text-2xl font-bold text-yellow-600">{movies?.length}</p>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Customer</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">#12345</td>
                  <td className="border border-gray-300 px-4 py-2">John Doe</td>
                  <td className="border border-gray-300 px-4 py-2">$500</td>
                  <td className="border border-gray-300 px-4 py-2 text-green-600">Completed</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">#12346</td>
                  <td className="border border-gray-300 px-4 py-2">Jane Smith</td>
                  <td className="border border-gray-300 px-4 py-2">$700</td>
                  <td className="border border-gray-300 px-4 py-2 text-yellow-600">Pending</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">#12347</td>
                  <td className="border border-gray-300 px-4 py-2">Sam Wilson</td>
                  <td className="border border-gray-300 px-4 py-2">$300</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-600">Cancelled</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
    </div>
  );
};

export default Dashboard;

