


import React from "react";
import primium from "../../assets/premiumfinalpage.png"
import { MailIcon } from '@heroicons/react/solid';
const UpgredOnUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="bg-white rounded-lg  max-w-md w-full p-6">
        <div className="flex items-center justify-start mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full">
            <img className="w-20" src={primium} alt="" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-start mb-4">
          You are getting an upgrade <br /> — on us!
        </h1>
        <p className="text-start text-gray-600 mb-6">
          Start your first month of Netflix with Premium for the price of
          Standard.
        </p>
        <div className="border rounded-lg border-red-600 p-4 bg-gradient-to-b from-purple-50 to-purple-100">
          <div className="flex justify-between items-center">
            <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full font-bold">
              Upgrade offer
            </span>
            <span className="text-gray-500 line-through text-sm">₹649</span>
          </div>
          <h2 className="text-xl font-bold mt-2">Premium</h2>
          <p className="text-sm text-gray-600">₹499 first month</p>
          <p className="text-sm text-gray-600">
            then auto-renews for ₹649/month
          </p>
          <ul className="text-sm text-gray-700 mt-4 space-y-2">
            <li className="flex items-center">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              4K + HDR video resolution
            </li>
            <li className="flex items-center">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Spatial audio (no equipment needed)
            </li>
            <li className="flex items-center">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              4 devices to watch at the same time
            </li>
          </ul>
          
        </div>
        <div className="flex ">
        <MailIcon className="h-6 w-6 text-gray-600" />
        <p className="text-sm text-gray-600 ">
       
            We will remind you 7 days before your offer ends.
          </p>
        </div>
        <button className="w-full bg-red-600 text-white py-3 mt-6 rounded-lg hover:bg-red-700">
          Try Premium
        </button>
        <button className="w-full bg-gray-400 text-black py-3 mt-6 rounded-lg hover:bg-red-700">
          Keep standerd
        </button>
        <span className="text-xs">Your Premium plan will continue after the first month at ₹649 unless you <br /> cancel or change the plans.</span>
      </div>
    </div>
  );
};

export default UpgredOnUs;

