import React from 'react';
import { useSelector } from 'react-redux';

const PaymentsDetails = () => {
  const allPayments = useSelector((state) => state.admin.allPayments);
  console.log("allPayments", allPayments);

  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Payments</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Customer</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {allPayments && allPayments.length > 0 ? (
              allPayments.map((payment) => (
                <tr key={payment.transactionId}>
                  <td className="border border-gray-300 px-4 py-2">#{payment._id}</td>
                  <td className="border border-gray-300 px-4 py-2">{payment.userId.email}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{payment.amount.toLocaleString()}</td>
                  <td className="border border-gray-300 px-4 py-2 text-green-600">
                    {payment.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center">No payments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsDetails;
