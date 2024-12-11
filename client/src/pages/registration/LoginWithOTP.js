

import React from 'react';

function LoginWithOTP() {
  return (
    <div className="flex flex-col  items-center justify-center h-screen bg-white text-white">
      <div className='w-96 bg-black h-full flex flex-col items-center py-20  '>
      <h1 className="text-3xl font-bold mb-4 text-center ">Enter the code we <br /> just sent</h1>
      <p className="text-sm mb-6 text-center text-gray-400">
        We sent a sign-in code to <br /> <span className="font-semibold">aslah.c77@gmail.com</span>. The code will expire <br /> in 15 minutes.
      </p>
      <div className="flex gap-2 mb-6">
        {Array(4).fill('').map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="w-16 h-16 text-center text-2xl bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        ))}
      </div>
      <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 w-80 rounded transition">
        Sign In
      </button>
      <div className="mt-4 text-gray-400">
        <p className="mb-2 mt-16 text-center">
          Did not receive a code? 
        </p>
       <div> <button className="text-white bg-gray-400 mb-5 w-80 py-2 px-6 rounded transition">Use Password Instead</button></div>
        <div  className='text-center'><button className="text-white bg-transparent text-center ">Resend Code</button></div>
      </div>
      </div>
    </div>
  );
}

export default LoginWithOTP;


