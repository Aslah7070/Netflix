import React from 'react';
import homeBackground from "../../assets/Devices.png";
import { useNavigate } from 'react-router-dom';


const Registration = () => {

const navigate=useNavigate()

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center  w-96 p-6 rounded-lg">
        <div className="w-72 ">
          <img src={homeBackground} alt="Home Background" className="w-full h-auto"/>
        </div>

        {/* Content Section */}
        <div className="text-center mt-4">
          <div className="text-lg">
            <span className="text-gray-700">STEP <b>1</b> OF <b>4</b></span>
            <h1 className=" text-gray-600 text-3xl font-bold mt-2">Finish setting up your account</h1>

          </div>
          <div className="text-gray-600 mt-4 text-lg">
            Netflix is personalised for you. <br /> Create a password to watch on any device at any time.
          </div>

          <div className="mt-6">
            <button onClick={()=>navigate("/signup")} className="bg-red-600 text-white px-32 py-3  font-bold hover:bg-red-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
