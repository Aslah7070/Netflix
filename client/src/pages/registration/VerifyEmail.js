import React from 'react';
import verifyImage from  "../../assets/safe-download.png"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const VerifyEmail = () => {
    const navigate=useNavigate()
const email=useSelector((state)=>state.user.islog)
console.log("verify",email);

    const verificationSkip=()=>{
navigate("/plancomponent")
    }
  return (
    <div className="min-h-screen flex justify-center bg-white">
      <div className="flex flex-col items-center h-1/3 w-1/3 mt-20 p-8 bg-white  ">
        {/* Title */}

        <div className=' '><img className='w-14 border border-red-600 rounded-full' src={verifyImage } alt="" /></div>
        <h1 className= "text-center text-3xl font-bold text-gray-800">
          Great, now let us verify your <br />email
        </h1>

        {/* Email Display */}
        <div className="text-gray-600 text-lg mt-4">
          <p className='text-center'>
            Click the link we sent to <b>{email}to </b>verify.
          </p>
        </div>

        {/* Information Text */}
        <div className="text-gray-600 mt-4 text-lg text-center">
          Verifying your email will improve account security and help you receive important Netflix communications.
        </div>

        {/* Resend Button */}
        <div className="mt-8">
          <button
            className="bg-gray-300 text-blac text-2xl py-4 px-52 rounded-md hover:bg-red-700 transition-colors"
            onClick={verificationSkip} // Action to resend the verification email
          >
            skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
