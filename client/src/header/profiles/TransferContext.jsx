import React from 'react'
import api from '../../axiosInstance/api';
import { useNavigate, useParams } from 'react-router-dom';

const TransferContext = () => {
    
    const {profileId}= useParams()
const navigate=useNavigate()


    const handleTransfer=()=>{
       navigate(`/selectransferaccount/${profileId}`)
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Start your profile transfer
            </h1>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl mb-2">
                😊
              </div>
              <p className="text-lg font-medium text-gray-700">moosa sahad</p>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline mt-1"
              >
                Transfer a different profile
              </a>
            </div>
            <button 
            onClick={handleTransfer}
            className="bg-red-500 text-white py-2 px-6 rounded-lg mt-6 hover:bg-red-600">
              Start Profile Transfer
            </button>
            <button className="text-gray-500 mt-2 hover:underline">Learn More</button>
          </div>
          <div className="mt-10 max-w-lg text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              We made it easy to transfer this profile
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-600">
                <span className="w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center mr-3">
                  🔄
                </span>
                Transfer recommendations, viewing history, My List, saved games, settings, and more.
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-6 h-6 bg-green-100 text-green-500 rounded-full flex items-center justify-center mr-3">
                  🛠️
                </span>
                Own your account, or join an existing account, and keep everything you love about this profile.
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-6 h-6 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-3">
                  💾
                </span>
                We’ll leave a backup copy of this profile on the original account.
              </li>
            </ul>
          </div>
        </div>
      );
}

export default TransferContext
