




import React, { useEffect, useState } from 'react';
import api from '../../axiosInstance/api';
import { useNavigate, useParams } from 'react-router-dom';

const TransferContext = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  const handleTransfer = () => {
    navigate(`/selectransferaccount/${profileId}`);
  };

    const [selectedProfile, setSelectedProfile] = useState("");
    const findProfile = async () => {
      try {
        const response = await api.get(`/fidPprofilebyid/${profileId}`);
        console.log("Profile Data:", response.data.pro);
        setSelectedProfile(response.data.pro);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    
  
    useEffect(() => {
      findProfile();

    }, [profileId]);

  const handleInputChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < 3) {
        document.getElementById(`pin-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      document.getElementById(`pin-${index - 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    if (pin.some((digit) => digit === '')) {
      setError('Please complete the 4-digit PIN.');
    } else {
      setError('');
      const pinNumber = pin.join('');
      console.log('Entered PIN:', pinNumber);

      try {
        const response = await api.post(`/unLockprofile/${profileId}`, { pinNumber });
        console.log('Unlock response:', response);
        if (response.data.success) {
          setIsModalOpen(false);
          console.log("true")
          navigate(`/selectransferaccount/${profileId}`)
        } else {
          setError('Incorrect PIN. Please try again.');
        }
      } catch (error) {
        console.error('Error unlocking profile:', error);
        setError('An error occurred. Please try again later.');
      }
    }
  };


  const handleTranfer=()=>{
    if(selectedProfile.pinNumber){
      setIsModalOpen(true)
    }
    
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center border border-black  bg-gray-50">
     <div className='border border-black py-10'>
     <div className="text-center ">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Start your profile transfer
        </h1>
        <div className="flex flex-col items-center">
         <img className='w-20' src={selectedProfile?.image} alt="" />
          <p className="text-lg font-medium text-gray-700">{selectedProfile?.name}</p>
          <a href="#" className="text-sm text-blue-500 hover:underline mt-1">
            Transfer a different profile
          </a>
        </div>
       <div className='flex flex-col items-center justify-center'>
       <button
          onClick={handleTranfer}
          className="bg-red-500  max-w-56 text-white py-2 px-6 rounded-lg mt-6 hover:bg-red-600"
        >
          Start Profile Transfer
        </button>
        <button className="text-gray-500 mt-2 hover:underline">Learn More</button>
       </div>
      </div>

      <div className="mt-10 max-w-lg text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          We made it easy to transfer this profile
        </h2>
        <ul className="space-y-10">
          <li className="flex items-center text-gray-600">
            <span className="w-6 h-6  bg-red-100 text-red-500 rounded-full flex items-center justify-center mr-3">
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Locked</h2>
            <p className="text-gray-600 mb-6">Enter the 4-digit PIN to unlock this profile.</p>
            <div className="flex space-x-4 justify-center mb-4">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  id={`pin-${index}`}
                  className={`h-12 w-12 border-2 text-center text-xl ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}
     </div>
    </div>
  );
};

export default TransferContext;
