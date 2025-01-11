import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosInstance/api';
import {Modal,Button} from "react-bootstrap"

const MovieListingTable = () => {

    

    const [isVisible,setIsVisible]=useState()
    const [movieId,setMovieId]=useState(null)

    console.log("isVisible",isVisible);
    
 const movies = useSelector((state) => state.movies.movies);
const navigate=useNavigate()

const deleteMovie=async()=>{
 try {
    const response=await api.post(`/deletemovie/${movieId}`)
    console.log("response",response);
   
        setMovieId(null)
 } catch (error) {
    console.log("error",error);
    
 }
    
    
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Movie Listing</h1>

    
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


      {/* {isVisible && (
           <Modal show={isVisible} onHide={handleModalClose} centered>
             <Modal.Body className="text-center bg-dark text-white p-4">
               <h4 className="fw-bold">Your payment is pending.</h4>
               <p className="mt-3">In the meantime, browse TV shows and movies.</p>
               <Button variant="light" onClick={handleModalClose} className="mt-3">
                 OK
               </Button>
             </Modal.Body>
           </Modal>
         )} */}

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

