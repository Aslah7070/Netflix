import React, { useState } from 'react';

import api from '../../axiosInstance/api';

const MovieUploadForm = () => {
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
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'videoFile') setVideoFile(files[0]);
    if (name === 'imageFile') setImageFile(files[0]);
  };

  console.log("files",videoFile )

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile || !imageFile) {
      alert('Please upload both video and image files.');
      return;
    }

    try {
        console.log("hello world");
        
      const data = new FormData();

      // Append form fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Append files
      data.append('videoFile', videoFile);
      data.append('imageFile', imageFile);

      // Post to backend
      console.log("helloe")
      const response = await api.post('/videoUploading', data);
      console.log("res",response);
      

      alert('Movie uploaded successfully!');
      console.log('Response:', response.data);

      // Reset form
      setFormData({
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
      setVideoFile(null);
      setImageFile(null);
    } catch (error) {
      console.error('Error uploading movie:', error);
      alert('Error uploading movie. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload a Movie</h2>
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
            Upload Video
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
            Upload Thumbnail
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
          Upload Movie
        </button>
      </form>
    </div>
  );
};

export default MovieUploadForm;
