import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from 'react-slider';
import api from '../../axiosInstance/api';
import { searchQuery, setMovies } from '../../redux/movieSlice';
import { useNavigate } from 'react-router-dom';

const ViewRestrictions = () => {
  const [rating, setRating] = useState(3); 
  const [data, setData] = useState('');
  console.log("data",data);
  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const ratings = ['U', 'U/A 7+', 'U/A 13+', 'U/A 16+', 'A'];
const query=useSelector((state)=>state.movies.search)
  const handleSliderChange = (value) => {
    console.log('rating', value);
    setRating(value);
  };
const allMovies=useSelector((state)=>state.movies.movies)
  

  
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        
        const response = await api.get(`/search?q=${query}`);
        setMovies(response.data.data); 
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);
  console.log("allMovies",allMovies);
   const handleSearchChange = async (event) => {
      const query = event.target.value;
      
      dispatch(searchQuery(query))
      if (query) {
        const response = await api.get(`/search?q=${query}`);
        console.log("response",response.data.data);
    setData(response.data.data)
        
      }
    };
  return (
    <div className="w-full h-full bg-gray-200 flex flex-col items-center">
      <div className="w-3/5 h-5/6 space-y-20">
        <div className="flex py-5 justify-between">
          <h1 className="text-5xl">Viewing Restrictions</h1>
          <img className="w-14" src="" alt="hello" />
        </div>
        <p className="text-3xl">Profile Maturity Rating for {}</p>
        <p className="text-2xl">Show titles of all maturity ratings for this profile.</p>

        <div className="w-full">
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="thumb"
            trackClassName="track"
            min={0}
            max={ratings.length - 1}
            step={1}
            value={rating}
            onChange={handleSliderChange}
            renderThumb={(props, state) => (
              <div
                {...props}
                className="w-10 h-10 bg-blue-600 p-3 rounded-full flex items-center justify-center text-white shadow-lg"
              >
                {ratings[state.value]}
              </div>
            )}
            renderTrack={(props, state) => (
              <div
                {...props}
                className={`h-4 rounded-full ${
                  state.index === 0 ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            )}
          />
          {/* Markers */}
          <div className="flex justify-between mt-4">
            {ratings.map((label, index) => (
              <span
                key={index}
                className={`text-xl font-medium mt-4  ${
                  index === rating ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h1>Children's Profile</h1>
          <input className="w-10 h-5" type="checkbox" />
          <span>Display the Netflix Children experience with titles just for children</span>
        </div>
        <hr />

        <div className="flex flex-col">
          <h1>Title Restrictions for Aslah</h1>
          <span className="mb-3">Don't show specific titles for this profile regardless of Maturity Rating</span>
          <input
            className="w-2/6 h-12"
            type="text"
            placeholder="Enter movie name"
            onChange={handleSearchChange} 

          />
           <div className="mt-3 border border-black">
    {data && data.slice(0, 5).map((movie, index) => (
      <span key={index} className="block text-gray-700">
        {movie.title}
      </span>
    ))}
  </div>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-10">
          <button className="text-2xl w-24 bg-blue-600 text-white border border-black">Save</button>
          <button className="text-2xl w-24 bg-gray-600 text-white border border-black">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ViewRestrictions;
