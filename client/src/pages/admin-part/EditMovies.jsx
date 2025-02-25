import React, { useState, useEffect } from 'react';
import api from '../../axiosInstance/api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditMovies = () => {

const {movieId}=useParams()
console.log("movieId",movieId);
const navigate=useNavigate()




  const [formData, setFormData] = useState({
    title: '',
    description: '',
    director: '',
    writer: '',
    cast: '',
    genre: '',
    language: '',
    releaseYear: '',
    duration: '',
    maturityRating: '',
    rating: '',
  });

  console.log("formData",formData);
  
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    
    const fetchMovieData = async () => {
      try {
        const response = await api.get(`/findthesinglemovie/${movieId}`);
        setFormData(response.data.movie);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        alert('Error fetching movie data. Please try again.');
      }
    };

    if (movieId) {
      fetchMovieData();
    }
  }, [movieId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'videoFile') setVideoFile(files[0]);
    if (name === 'imageFile') setImageFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      
      if (videoFile) data.append('videoFile', videoFile);
      if (imageFile) data.append('imageFile', imageFile);

   
      const response = await api.put(`/updatemovies/${movieId}`, data);

console.log('Response:', response);
if(response.data.message==="No changes detected!"){
       toast.warning(response.data.message)
       return
}

console.log("response.data.status",response.data);



if (response.data.message === "Movie updated successfully!") {
  const updatedFields = response.data.updatedFields;

  if (updatedFields) {
    // Extract only the field names
    const updatedFieldNames = Object.keys(updatedFields).join(", ");

 
    toast.success(
      <span>
        <strong>{updatedFieldNames}</strong> have been updated successfully.
      </span>
    );

    navigate("/movielisting")
  }
}

  
  
     
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Error updating movie. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Text Inputs */}
        {[
          { label: 'Title', name: 'title', type: 'text' },
          { label: 'Description', name: 'description', type: 'textarea' },
          { label: 'Director', name: 'director', type: 'text' },
          { label: 'Writer', name: 'writer', type: 'text' },
          { label: 'Cast (comma separated)', name: 'cast', type: 'text' },
          { label: 'Genre (comma separated)', name: 'genre', type: 'text' },
          { label: 'Language', name: 'language', type: 'text' },
          { label: 'Release Year', name: 'releaseYear', type: 'number' },
          { label: 'Duration (in minutes)', name: 'duration', type: 'number' },
          { label: 'Maturity Rating', name: 'maturityRating', type: 'text' },
          { label: 'Rating', name: 'rating', type: 'text' },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
              {label}
            </label>
            {type === 'textarea' ? (
              <textarea
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            ) : (
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        {/* File Inputs */}
        <div>
          <label htmlFor="videoFile" className="block text-gray-700 font-medium mb-2">
            Upload Video (Optional)
          </label>
          <input
            id="videoFile"
            name="videoFile"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="imageFile" className="block text-gray-700 font-medium mb-2">
            Upload Thumbnail (Optional)
          </label>
          <input
            id="imageFile"
            name="imageFile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditMovies;
