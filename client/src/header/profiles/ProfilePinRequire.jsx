

import React, { useEffect, useState } from 'react';
import api from '../../axiosInstance/api';
import { useParams } from 'react-router-dom';

const ProfilePinRequire = () => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [selectedProfile, setSelectedProfile] = useState("");
const {profileId}= useParams()

console.log("pin",pin);


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
    if (selectedProfile?.pinNumber) {
      setPin(selectedProfile.pinNumber.split(''));
      setIsPinRequired(true); 
    }
  }, [selectedProfile]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.some((digit) => digit === '')) {
      setError('Please complete the 4-digit PIN.');
    } else {
      setError('');
      console.log('PIN:', pin.join(''));
      const pinNumber=pin.join('')
      if(pinNumber.length===4){
        console.log("pinNumber",pinNumber);
        const blockProfile=async(pinNumber)=>{
           try {
            const response=await api.post(`/profileblock/${profileId}`,{pinNumber:pinNumber})

            console.log("responseOnpin",response);
           } catch (error) {
        console.log("error",error);
        
           }
            
        }

        blockProfile(pinNumber)
      }

    }
  };
  const [isPinRequired, setIsPinRequired] = useState(false); 
console.log("isPinRequired",isPinRequired);

  const handleCheckboxChange = () => {
    setIsPinRequired(!isPinRequired); 
  };
  return (
    <div className="w-full h-screen bg-gray-200 flex flex-col items-center justify-center">
      <form
        className="w-3/5 h-5/6 space-y-20 bg-white p-8 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center py-5">
          <h1 className="text-4xl font-bold">Profile Lock</h1>
          <img className="w-14 h-14 object-cover" src={selectedProfile?.image} alt="Profile" />
        </div>

        <p className="text-2xl">
          Lock this profile by creating a 4-digit PIN.
        </p>

        <div className="space-y-6">
        <div className='flex items-center '>
            <input type="checkbox" className='w-16 h-5' 
            checked={isPinRequired}
            onChange={handleCheckboxChange}
            />
            <span>require PIN to access {selectedProfile?.name}'s  profile</span>
        </div>
          {
            isPinRequired&&(
                <div className="flex space-x-4">
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-${index}`}
                className={`h-12 w-12 border-3 text-center text-xl ${
                  error ? 'border-red-700' : 'border-gray-300'
                }`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
            )
          }
          <span className="text-red-700">{error}</span>
            
         
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="text-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
          >
            Save
          </button>
          <button
            type="button"
            className="text-xl bg-gray-400 hover:bg-gray-500 text-black px-6 py-3 rounded-md"
            onClick={() => console.log('Cancel')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePinRequire;
