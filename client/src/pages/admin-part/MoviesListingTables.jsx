import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MovieListingTable = () => {
 const movies = useSelector((state) => state.movies.movies);
const navigate=useNavigate()



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Movie Listing</h1>



      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Director</th>
              <th className="py-3 px-6 text-left">Genre</th>
              <th className="py-3 px-6 text-left">Language</th>
              <th className="py-3 px-6 text-left">Year</th>
              <th className="py-3 px-6 text-left">Rating</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr
                key={movie._id}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
              >
                <td className="py-3 px-6 text-lg">{index + 1}</td>
                <td className="py-3 px-6 text-lg">{movie.title}</td>
                <td className="py-3 px-6 text-lg">{movie.director}</td>
                <td className="py-3 px-6 text-lg">
                  {movie.genre && movie.genre.join(', ')}
                </td>
                <td className="py-3 px-6 text-lg">{movie.language}</td>
                <td className="py-3 px-6 text-lg">{movie.releaseYear}</td>
                <td className="py-3 px-6 text-lg">{movie.rating}</td>
                <td className="py-3 px-6 flex space-x-4">
                  <button 
                  onClick={()=>navigate(`/editmovie/${movie._id}`)}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieListingTable;

