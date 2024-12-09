import React from 'react';
import tickImage from "../../assets/f44f9566a344d9745bc1048c230a28f5_t.jpeg"
import okTick from "../../assets/ok-tick-vector-icon-style-260nw-474974377 (1).webp"
import { useNavigate } from 'react-router-dom';

const PlanComponent = () => {

    const navigate=useNavigate()
  return (
    <div className="min-h-screen flex justify-center bg-white">
      <div className="flex flex-col items-center w-2/3 mt-20">
        <div className="text-center mt-3">
            <div className=' flex justify-center items-center'>
                <img className='w-14 ' src={tickImage} alt="" />
            </div>
          <div className="text-sm">
            <span className="text-gray-700">STEP <b>3</b> OF <b>4</b></span>
            <h1 className="text-gray-800 text-3xl font-bold mt-2">
              Choose your plan.
            </h1>
          </div>

          <div className="text-gray-600 mt-4 text-lg space-y-4">
  {/* No Commitments */}
  <div className="flex items-center space-x-2">
    <img className="w-5 h-5" src={okTick} alt="Tick icon" />
    <span>No commitments, cancel anytime.</span>
  </div>

  {/* Everything on Netflix */}
  <div className="flex items-center space-x-2">
    <img className="w-5 h-5" src={okTick} alt="Tick icon" />
    <span>Everything on Netflix for one low price.</span>
  </div>

  {/* No Ads */}
  <div className="flex items-center space-x-2">
    <img className="w-5 h-5" src={okTick} alt="Tick icon" />
    <span>No ads and no extra fees. Ever.</span>
  </div>
</div>


          {/* Plan Options */}
          <div className="mt-6 w-full">
        
            <div className="mt-6">
              <button onClick={()=>navigate('/premiumslice')}
                className="bg-red-600 w-full h-16 text-white px-16 py-3 font-bold hover:bg-red-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanComponent;

