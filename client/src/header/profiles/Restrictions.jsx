import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../axiosInstance/api';

const Restrictions = () => {
  const { profileId } = useParams();

  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const activeUser = useSelector((state) => state.profile.currentProfile);
  const allProfile = useSelector((state) => state.profile.Profiles);
  const selectedProfile = allProfile.find((profile) => profile._id === profileId);

  const handleSubmit = async () => {
    try {
      const response = await api.post('/confirmrestrictions', { password: data });
      if (response.status === 200 && response.data.user.email) {
        navigate(`/viewrestrictions/${selectedProfile._id}`);
      }
      setError('');
    } catch (err) {
      if (err.response?.status === 400) {
        setError('Incorrect password');
      } else {
        setError('');
      }
    }
  };

  const handleChange = (e) => {
    setData(e.target.value);
  };

  return (
    <div className="w-full h-full bg-gray-200 flex flex-col items-center p-4 md:p-10">
      <form
        className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-5xl font-bold">View Restrictions</h1>
          {selectedProfile?.image && (
            <img
              className="w-12 h-12 md:w-16 md:h-16 rounded-full"
              src={selectedProfile.image}
              alt={`${selectedProfile?.name}'s profile`}
            />
          )}
        </div>

        <p className="text-lg md:text-2xl text-gray-700">
          Enter your account password to edit Profile Maturity Rating and Title Restrictions for{' '}
          <span className="font-semibold">{selectedProfile?.name}'s</span> profile.
        </p>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
            <input
              className={`h-12 w-full md:w-96 border-2 ${
                error ? 'border-red-700' : 'border-gray-300'
              } rounded-md px-4`}
              type="password"
              placeholder="Enter your password"
              required
              value={data}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => navigate('/sendemail')}
              className="text-sm md:text-xl text-blue-600 hover:underline ml-0 md:ml-4"
            >
              Create or reset password
            </button>
          </div>
          {error && <span className="text-red-700 text-sm md:text-base">{error}</span>}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <button
            type="submit"
            className="text-white bg-blue-600 px-6 py-3 rounded-lg w-full md:w-auto"
          >
            Continue
          </button>
          <button
            type="button"
            className="bg-gray-400 text-black px-6 py-3 rounded-lg w-full md:w-auto"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Restrictions;
