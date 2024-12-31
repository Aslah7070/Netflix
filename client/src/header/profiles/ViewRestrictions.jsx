

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from 'react-slider';
import api from '../../axiosInstance/api';
import { removeRestricted, searchQuery, setMovies, setRestricted } from '../../redux/movieSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IoMdClose } from "react-icons/io";

const ViewRestrictions = () => {
  const [rating, setRating] = useState(3);
  const [data, setData] = useState('');
  const [list, setList] = useState([]);
  const [queries, setQueries] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ratings = ['U', 'U/A 7+', 'U/A 13+', 'U/A 16+', 'A'];
  const query = useSelector((state) => state.movies.search);
  const restrictedMovies = useSelector((state) => state.movies.restricted);

  const allMovies = useSelector((state) => state.movies.movies);

  const handleSliderChange = (value) => {
    setRating(value);
  };
  console.log("restrictedMovies length", restrictedMovies); // Check if it's empty or populated
  console.log("restrictedMovies", JSON.stringify(restrictedMovies));  // Logs the actual array
  

  const handleList = async (id, title) => {
    try {
      const response = await api.post(`/restrictedMovies/${id}`);
      if (response.data) {
        setQueries(title); // Set the selected movie title to the input
        setShowSearchResults(false); 
        console.log("hello",response.data.title);
        
        dispatch(setRestricted(response.data.title));
       
      }
    } catch (error) {
      if (error.response?.data?.message === "movie is already excist") {
        toast.error("Movie already exists", {
          position: "bottom-center",
          style: {
            backgroundColor: "black",
            color: "white",
          },
          autoClose: 3000,
        });
      }
    }
  };

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setQueries(query);
    if (query) {
      setShowSearchResults(true); 
      const response = await api.get(`/namebasedsearch?q=${query}`);
      setData(response.data.success);
    } else {
      setShowSearchResults(false);
      setData('');
    }
  };

  const handleInputFocus = () => {
    if (queries) {
      setShowSearchResults(true); 
    }
  };

  const handleRemoveRestriction = async (title) => {
    try {
      const response = await api.post("/deleterestrictedmovies", { title });
  
      if (response.data.success) {
        
        console.log("Updated restricted movies:", response.data.balanceMovies);
        dispatch(removeRestricted(response.data.balanceMovies)); // Update Redux state
      } else {
        console.error("Failed to remove movie:", response.data.message);
      }
    } catch (error) {
      console.error("Error while removing restricted movie:", error);
    }
  };
  

  return (
    <div className="w-full h-full bg-gray-200 flex flex-col items-center">
      <div className="w-3/5 h-5/6 space-y-20">
        {/* Header */}
        <div className="flex py-5 justify-between">
          <h1 className="text-5xl">Viewing Restrictions</h1>
          <img className="w-14" src="" alt="hello" />
        </div>
        <p className="text-3xl">Profile Maturity Rating for {}</p>
        <p className="text-2xl">Show titles of all maturity ratings for this profile.</p>

        {/* Slider */}
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
          <div className="flex justify-between mt-4">
            {ratings.map((label, index) => (
              <span
                key={index}
                className={`text-xl font-medium mt-4 ${
                  index === rating ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="flex flex-col">
          <h1>Title Restrictions for Aslah</h1>
          <span className="mb-3">Don't show specific titles for this profile regardless of Maturity Rating</span>
          <input
            className="w-3/6 h-12"
            type="text"
            value={queries}
            placeholder="Enter movie name"
            onChange={handleSearchChange}
            onFocus={handleInputFocus}
          />
          {showSearchResults && data && (
            <div className="mt-3 border border-black w-96">
              <table className="table-auto border-collapse border border-gray-500 w-full">
                <tbody>
                  {data.slice(0, 5).map((movie) => (
                    <tr key={movie._id} className="text-gray-700">
                      <td
                        onClick={() => handleList(movie._id, movie.title)}
                        className="border border-black px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {movie.title}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Restricted Movies */}
        <div className="flex flex-col w-3/6 space-y-3">
          {restrictedMovies &&
            restrictedMovies.map((title, index) => (
             <div className='flex justify-between'> 
              <span key={index} className="text-red-700 text-lg">
             {title}
           </span>
           <span onClick={()=>handleRemoveRestriction(title)}><IoMdClose/></span>
           </div>
            ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center space-x-4 mb-10">
          <button className="text-2xl w-24 bg-blue-600 text-white border border-black">Save </button>
          <button className="text-2xl w-24 bg-gray-600 text-white border border-black">Cancel </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRestrictions;
