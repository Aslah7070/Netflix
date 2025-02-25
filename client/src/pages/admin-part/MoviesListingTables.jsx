import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosInstance/api';
import {Modal,Button} from "react-bootstrap"
import { setMovies } from '../../redux/movieSlice';
import { setAdminMovies } from '../../redux/adminSlice';

const MovieListingTable = () => {
    
   
    const movies = useSelector((state) => state.admin.movies);
    console.log("moviesA",movies)
    const navigate=useNavigate()
const dispatch=useDispatch()
const currentProfile=useSelector((state)=>state.profile.currentProfile)
    useEffect(()=>{
        fetchMovies()
    },[])

    const fetchMovies = async () => {
        try {
          const response = await api.get("fetchmovies");
           console.log("response.data.data",response.data.data);
  
          const  moviess = response.data.data  
          console.log("moviess",moviess);
          
  
           
  
          
          dispatch(setAdminMovies(moviess))
        } catch (error) {
          console.error("Error fetching movies:", error.message);
        }
      };
    

    const [isVisible,setIsVisible]=useState()
    const [movieId,setMovieId]=useState(null)

    console.log("isVisible",isVisible);


const deleteMovie=async()=>{

    const response=await api.post(`/deletemovie/${movieId}`)
    console.log("response",response);
   
        setMovieId(null)

    
    
}


const handleConfirmDelete=(movieId)=>{
    setMovieId(movieId)
    setIsVisible(true)
}


const handleModalClose=()=>{
    setIsVisible(false)
    setMovieId(null)
}

const handleDelete=()=>{
    deleteMovie()
}

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className='flex justify-between'>
      <h1 className="text-sm  md:text-xl font-bold text-gray-800 mb-6">Admin Movie Listing</h1>
      <span className="text-sm  md:text-xl font-bold">Total Movies: {movies.length}</span>

      </div>

    
   {
    isVisible&&(
        <Modal show={isVisible} onHide={handleModalClose } centered>
        <Modal.Body className="text-center bg-dark text-white p-4">
            <p>Are you confirm to delete this movie</p>
            <Button variant="light" onClick={handleDelete} className="mt-3 bg-success">OK</Button>
            <Button variant="light" onClick={handleModalClose} className="mt-3 ms-3 bg-danger">Cancel</Button>
        </Modal.Body>
     </Modal>
    )
   }



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
                  <button
                  onClick={()=>handleConfirmDelete(movie._id)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded">
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

