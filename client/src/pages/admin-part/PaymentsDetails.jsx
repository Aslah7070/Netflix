// import React from 'react';
// import { useSelector } from 'react-redux';

// const PaymentsDetails = () => {
//   const allPayments = useSelector((state) => state.admin.allPayments);
//   console.log("allPayments", allPayments);

//   return (
//     <div className='bg-red-600 w-full'>
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h2 className="text-lg font-bold mb-4">Payments</h2>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Customer</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allPayments && allPayments.length > 0 ? (
//               allPayments.map((payment) => (
//                 <tr key={payment.transactionId}>
//                   <td className="border border-gray-300 px-4 py-2">#{payment._id}</td>
//                   <td className="border border-gray-300 px-4 py-2">{payment.userId?.email}</td>
//                   <td className="border border-gray-300 px-4 py-2">₹{payment.amount.toLocaleString()}</td>
//                   <td className="border border-gray-300 px-4 py-2 text-green-600">
//                     {payment.status}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">{new Date(payment.date).toLocaleDateString()}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center">No payments found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PaymentsDetails;

import React from 'react';
import { useSelector } from 'react-redux';

const PaymentsDetails = () => {
  const allPayments = useSelector((state) => state.admin.allPayments);
  console.log('allPayments', allPayments);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Payments</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {allPayments && allPayments.length > 0 ? (
              allPayments.map((payment, index) => (
                <tr
                  key={payment.transactionId}
                  className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
                >
                  <td className="py-3 px-6 text-lg">#{payment._id}</td>
                  <td className="py-3 px-6 text-lg">{payment.userId?.email}</td>
                  <td className="py-3 px-6 text-lg">₹{payment.amount.toLocaleString()}</td>
                  <td className="py-3 px-6 text-lg text-green-600">{payment.status}</td>
                  <td className="py-3 px-6 text-lg">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-300 text-center py-3 px-6">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsDetails;

