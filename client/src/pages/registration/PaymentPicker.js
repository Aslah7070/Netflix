// import React from 'react'

// const PaymentPicker = () => {
//   return (
//     <div>
//       <h1>hrlloendfadsladsfnadksjfx macj</h1>
//     </div>
//   )
// }

// export default PaymentPicker



import React, { useState } from 'react';

import { CreditCardIcon, PhoneIcon } from '@heroicons/react/solid';

import lock from "../../assets/SECURITY_Final (1).webp"
import visa from "../../assets/images.jpg"
import gpay from "../../assets/payment-logo-icons-300x80.webp"
import { SlArrowRight } from "react-icons/sl";
const PaymentPicker = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className='flex flex-col items-center justify-center'>
        <img className='text-center w-20' src={lock} alt="" />
      <h2 className='text-center'>STEP 3 OF 3:</h2>
      <h1 className=" text-center text-xl font-semibold text-gray-800 mb-4"> Choose how to pay</h1>
      <p className="text-center text-gray-600 mb-6">
        Your payment is encrypted and you can change your <br /> payment method at any time.
        
      </p>
      <span className='text-center'>Secure for peace of mind. <br /> Cancel easily online.</span>
      
      </div>
      <div className='flex justify-end '>
      <span className='text-end text-xs'> End-to-end encrypted.</span> 
      </div>
      
      <div className="space-y-6 ">
        {/* Credit/Debit Card Section */}
        <div
          className={`p-4 rounded-lg border-2 flex  ${selectedPaymentMethod === 'creditCard' ? 'border-purple-500' : 'border-gray-300'} hover:border-purple-500 cursor-pointer`}
          onClick={() => handlePaymentMethodSelect('creditCard')}
        >
          <div className="flex items-center space-x-4 me-5">
            <CreditCardIcon className="h-6 w-6 text-gray-600" />
            <span className="text-gray-800 font-medium">Credit or Debit Card</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {/* Visa, Mastercard, Diners Club */}
            
            <img className='w-24' src={visa} alt="" />
          </div>
          <div className="ml-auto flex items-center">
    <SlArrowRight className="h-6 w-6 text-gray-600" />
  </div>
        </div>

        {/* UPI AutoPay Section */}
        <div
          className={`p-4 rounded-lg border-2 flex ${selectedPaymentMethod === 'upi' ? 'border-purple-500' : 'border-gray-300'} hover:border-purple-500 cursor-pointer`}
          onClick={() => handlePaymentMethodSelect('upi')}
        >
          <div className="flex items-center space-x-4 me-5">
            <PhoneIcon className="h-6 w-6 text-gray-600" />
            <span className="text-gray-800 font-medium ">UPI AutoPay </span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {/* BHIM, Paytm, PhonePe, Amazon Pay, Google Pay */}
            <img className='w-24'  src={gpay} alt="" />
            
          </div>
          <div className="ml-auto flex items-center">
    <SlArrowRight className="h-6 w-6 text-gray-600" />
  </div>
        </div>
      </div>

      {/* Payment Method Details (show only when selected) */}
      {selectedPaymentMethod && (
        <div className="mt-6 text-gray-600">
          <h3 className="text-lg font-medium">You have selected:</h3>
          <p className="text-sm mt-1">
            {selectedPaymentMethod === 'creditCard' ? 'Credit or Debit Card' : 'UPI AutoPay'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentPicker;
