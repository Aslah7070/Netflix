

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../../axiosInstance/api';
import PrimeNavBar from '../../../header/PrimeNavBar';


const SearchResults = () => {
    
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q'); 
  console.log("movies",movies);
  

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

  return (
    <div className='bg-black'>
    <PrimeNavBar />

    {movies.length > 0 ? (
      <div className="grid grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-black p-4 rounded-lg text-center">
            <img src={movie.thumbnailUrl} alt={movie.title} className="w-full h-auto rounded-md" />
            <h2 className="text-lg mt-4">{movie.title}</h2>
          </div>
        ))}
      </div>
    ) : (
      <div className=' bg-black p-4 rounded-lg h-screen flex  items-center justify-center text-center'>
        <p className='text-white'>No movies found</p>
      </div>
    )}
  </div>
  
  );
};

export default SearchResults;
