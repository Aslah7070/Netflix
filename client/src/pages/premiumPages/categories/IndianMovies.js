


import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper core CSS
import { useSelector } from 'react-redux';

const IndianMovies = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(null); // Track hovered video

  // Fetch movies from Redux state
  const movies = useSelector((state) => state.movies.movies) || [];

  // Function to handle hover and play video for 20 seconds
  const handleMouseEnter = (videoUrl) => {
    setIsHovered(videoUrl);
  };

  // Function to handle click and open full-screen
  const handleClick = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setIsFullscreen(true);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h2 className="text-center text-2xl font-semibold mb-8">Indian Movies</h2>

      {/* Swiper for Movie Thumbnails */}
      <Swiper
        spaceBetween={15}
        slidesPerView={10}
        pagination={{ clickable: true }}
        navigation
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie._id}>
            <div
              onMouseEnter={() => handleMouseEnter(movie.videoUrl)}
              onMouseLeave={() => setIsHovered(null)} // Reset hover state
              onClick={() => handleClick(movie.videoUrl)}
              className="cursor-pointer relative"
            >
              {/* Video shown during hover */}
              {!isFullscreen && isHovered === movie.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-950 bg-opacity-50">
                  <video
                    src={movie.videoUrl}
                    autoPlay
                    muted
                    className="w-full h-72 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Thumbnail Image */}
              {isHovered !== movie.videoUrl && (
                <img
                  src={movie.thumbnailUrl}
                  alt={movie.title || 'Movie Thumbnail'}
                  className="w-full h-40 object-cover rounded-lg"
                  loading="lazy"
                />
              )}

              {/* Movie Title */}
              <p className="text-center mt-2 text-base">{movie.title || 'Untitled'}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Display Video in Fullscreen */}
      {currentVideo && isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative w-full h-full">
            <video
              src={currentVideo}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};




export default IndianMovies;
