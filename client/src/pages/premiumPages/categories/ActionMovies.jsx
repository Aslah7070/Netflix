import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useSelector } from 'react-redux';



const ActionMovies = () => {
const movies=useSelector((state)=>state.movies.movies)
console.log("hello",movies);
const actionMovies = movies.filter((movie) => movie.genre.includes("Action"));

console.log("Action Movies:", actionMovies);

const [currentVideo, setCurrentVideo] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

const handleMouseEnter = (movieId) => {
    setIsHovered(movieId);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  const handleClick = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setIsFullscreen(true);
  };


  return (
    <div className="relative mx-auto   w-full">
    <h2 className="text-start text-2xl font-semibold  text-white">
      fun movies
    </h2>

    <Swiper
      spaceBetween={5}
      slidesPerView={6}
      navigation
      modules={[Navigation]}
      className="relative"
    >
      {actionMovies.map((movie) => (
        <SwiperSlide key={movie._id}>
          <div
            onMouseEnter={() => handleMouseEnter(movie._id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(movie.videoUrl)}
            className="relative cursor-pointer rounded-lg overflow-hidden h-32"
            style={{
              transform:
                isHovered === movie._id ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease-in-out",
              zIndex: isHovered === movie._id ? 10 : 1,
            }}
          >
            {/* Video Preview and Overlay on Hover */}
            {isHovered === movie._id ? (
              <div className="relative">
                <video
                  src={movie.videoUrl}
                  autoPlay
                  muted
                  className="w-full h-40 object-cover rounded-lg"
                />
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4">
                  <h3 className="text-lg font-bold text-white">
                    {movie.title || "Untitled"}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {movie.duration || "N/A"} •{" "}
                    {movie.genre || "Genre"}
                  </p>
                  <button
                    className="mt-2 bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() => handleClick(movie.videoUrl)}
                  >
                    Play
                  </button>
                </div>
              </div>
            ) : (
              // Thumbnail Image
              <img
                src={movie.thumbnailUrl}
                alt={movie.title || "Movie Thumbnail"}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* Fullscreen Video */}
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
  )
}

export default ActionMovies


