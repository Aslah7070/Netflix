// import React from 'react';
// import homeBackgroundImage from "../../assets/netflixHomeimage.jpg"; // Ensure the correct path
// import api from '../../axiosInstance/api';

// function LoginWithOTP() {

//   console.log("homeBackgroundImage",homeBackgroundImage);

//   const handleEnterOtp=async()=>{
    
//      const responce=await api.post("/login-otp")

    
//   }
  
//   return (
//     <div 
//     className="flex flex-col items-center justify-center h-screen bg-white text-white"
//      style={{ backgroundImage:`url(${homeBackgroundImage})`}}
//  >
//       <div className=" mt-20 w-full max-w-sm px-8 pt-14 bg-black h-full flex flex-col items-center ">
//         <h1 className="text-3xl font-bold mb-4 text-center">Enter the code we <br /> just sent</h1>
//         <p className="text-sm mb-6 text-center text-gray-400">
//           We sent a sign-in code to <br /> <span className="font-semibold">aslah.c77@gmail.com</span>. The code will expire <br /> in 15 minutes.
//         </p>
//         <div className="flex gap-2 mb-6">
//           {Array(4).fill('').map((_, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength="1"
//               className="w-16 h-16 text-center text-2xl bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           ))}
//         </div>
//         <button onClick={handleEnterOtp} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 w-80 rounded transition">
//           Sign In
//         </button>
//         <div className="mt-4 text-gray-400">
//           <p className="mb-2 mt-16 text-center">
//             Did not receive a code? 
//           </p>
//           <div> 
//             <button className="text-white bg-gray-400 mb-5 w-80 py-2 px-6 rounded transition">
//               Use Password Instead
//             </button>
//           </div>
//           <div className='text-center'>
//             <button className="text-white bg-transparent text-center">Resend Code</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginWithOTP;


import React, { useState } from 'react';
import homeBackgroundImage from "../../assets/netflixHomeimage.jpg"; // Ensure the correct path
import api from '../../axiosInstance/api';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus, setUserData } from '../../redux/slice';
import { useNavigate } from 'react-router-dom';

function LoginWithOTP() {
  const navigate=useNavigate()
  const [otp, setOtp] = useState(Array(4).fill('')); // State to hold OTP values
  const dispatch=useDispatch()
  const emailFromRedux = useSelector((state) => state.user.email);
  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value; // Update the specific input field
    setOtp(newOtp);
  };

  const handleEnterOtp = async () => {
    try {
      const otpCode = otp.join(''); // Combine OTP digits into a single string
      console.log("OTP Entered:", otpCode);
      
      const response = await api.post("/login-otp", { otp: otpCode,email:emailFromRedux});
      console.log("API Response:", response);
      const user=response.data.user
      console.log("use",user);
    
      dispatch(setUserData(user));
      dispatch(setLoginStatus(true));
      navigate("/")
    } catch (error) {
      console.error("Error during OTP submission:", error);
    }
  };
const handleBackToPassword=()=>{
  navigate("/login")
}
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-white text-white"
      style={{ backgroundImage: `url(${homeBackgroundImage})` }}
    >
      <div className="mt-20 w-full max-w-sm px-8 pt-14 bg-black h-full flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Enter the code we <br /> just sent
        </h1>
        <p className="text-sm mb-6 text-center text-gray-400">
          We sent a sign-in code to <br />{" "}
          <span className="font-semibold">aslah.c77@gmail.com</span>. The code
          will expire <br /> in 15 minutes.
        </p>
        <div className="flex gap-2 mb-6">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleInputChange(e.target.value, index)}
              className="w-16 h-16 text-center text-2xl bg-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          ))}
        </div>
        <button
          onClick={handleEnterOtp}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 w-80 rounded transition"
        >
          Sign In
        </button>
        <div className="mt-4 text-gray-400">
          <p className="mb-2 mt-16 text-center">Did not receive a code?</p>
          <div>
            <button onClick={handleBackToPassword} className="text-white bg-gray-400 mb-5 w-80 py-2 px-6 rounded transition">
              Use Password Instead
            </button>
          </div>
          <div className="text-center">
            <button className="text-white bg-transparent text-center">
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginWithOTP;
