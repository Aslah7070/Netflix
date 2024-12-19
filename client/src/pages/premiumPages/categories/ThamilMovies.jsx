// import React, { useState } from 'react'
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { useSelector } from 'react-redux';

// const ThamilMovies = () => {
//     const [currentVideo, setCurrentVideo] = useState(null);
//     const [isFullscreen, setIsFullscreen] = useState(false);
//     const [isHovered, setIsHovered] = useState(null);
  
//     const movies = useSelector((state) => state.movies.movies) || [];
//     const dramaMovies = movies.filter((movie) => movie.genre.includes("Drama"));
  
//     console.log(" dramaMovies:", dramaMovies);
//     const handleMouseEnter = (movieId) => {
//       setIsHovered(movieId);
//     };
  
//     const handleMouseLeave = () => {
//       setIsHovered(null);
//     };
  
//     const handleClick = (videoUrl) => {
//       setCurrentVideo(videoUrl);
//       setIsFullscreen(true);
//     };
  
//     return (
//       <div className="relative mx-auto mt-20 p-4  w-full">
//         <h2 className="text-start text-2xl font-semibold  text-white">
//           Indian Drama Movies
//         </h2>
  
//         <Swiper
//           spaceBetween={5}
//           slidesPerView={6}
//           navigation
//           modules={[Navigation]}
//           className="relative"
//         >
//           {dramaMovies.map((movie) => (
//             <SwiperSlide  key={movie._id}>
//               <div
//                 onMouseEnter={() => handleMouseEnter(movie._id)}
//                 onMouseLeave={handleMouseLeave}
//                 onClick={() => handleClick(movie.videoUrl)}
//                 className="relative cursor-pointer rounded-sm overflow-hidden  w-full h-32"
//                 style={{
//                   transform:
//                     isHovered === movie._id ? "scale(1.1)" : "scale(1)",
//                   transition: "transform 0.3s ease-in-out",
//                   zIndex: isHovered === movie._id ? 10 : 1,
//                 }}
//               >
            
//                 {isHovered === movie._id ? (
//                   <div className="relative">
//                     <video
//                       src={movie.videoUrl}
//                       autoPlay
//                       muted
//                       className="w-full h-40 object-cover rounded-lg"
//                     />
                   
//                     <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4">
//                       <h3 className="text-lg font-bold text-white">
//                         {movie.title || "Untitled"}
//                       </h3>
//                       <p className="text-sm text-gray-300">
//                         {movie.duration || "N/A"} •{" "}
//                         {movie.genre || "Genre"}
//                       </p>
//                       <button
//                         className="mt-2 bg-red-600 text-white py-1 px-3 rounded"
//                         onClick={() => handleClick(movie.videoUrl)}
//                       >
//                         Play
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
                  
//                   <img
//                     src={movie.thumbnailUrl}
//                     alt={movie.title || "Movie Thumbnail"}
//                     className="w-full h-full object-cover rounded-lg"
//                     loading="lazy"
//                   />
//                 )}
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
  
  
//         {currentVideo && isFullscreen && (
//           <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
//             <div className="relative w-full h-full">
//               <video
//                 src={currentVideo}
//                 controls
//                 autoPlay
//                 className="w-full h-full object-contain"
//               />
//               <button
//                 onClick={() => setIsFullscreen(false)}
//                 className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
// }

// export default ThamilMovies





import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from "react-icons/fa";

const ThamilMovies = () => {
  // Fetch movies (filtering Tamil)
  const movies = useSelector((state) => state.movies.movies) || [];
  const Hindi = movies.filter((movie) => movie.language === "Tamil");

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [hoveredMovie, setHoveredMovie] = useState(null);

  return (
    <div className="relative mx-auto mt-10 w-full px-6 z--10">
      <h2 className="text-start text-2xl font-semibold text-white mb-4">
        Indian Tamil Movies
      </h2>

      {/* Slider Component */}
      <Slider {...settings}>
        {Hindi.map((movie) => (
          <div
            key={movie._id}
            className="p-2"
            onMouseEnter={() => setHoveredMovie(movie._id)}
            onMouseLeave={() => setHoveredMovie(null)}
          >
            <div
              className="rounded-lg h-36 overflow-hidden  relative cursor-pointer transition-transform transform ease-in-out"
            >
              {hoveredMovie === movie._id ? (
                <video
                  src={movie.videoUrl}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              ) : (
                <img
                  src={movie.thumbnailUrl}
                  alt={movie.title || "Movie Thumbnail"}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              )}

              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg font-semibold">
                  {movie.title || "Untitled"}
                </h3>
                <p className="text-gray-400 text-sm">
                  {movie.duration || "N/A"} • {movie.genre.join(", ")}
                </p>
                <div className="flex gap-2 mt-2">
                  <button className="bg-white text-black p-2 rounded-full">
                    <FaPlay />
                  </button>
                  <button className="bg-gray-600 text-white p-2 rounded-full">
                    <FaPlus />
                  </button>
                  <button className="bg-gray-600 text-white p-2 rounded-full">
                    <FaThumbsUp />
                  </button>
                  <button className="bg-gray-600 text-white p-2 rounded-full">
                    <FaChevronDown />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ThamilMovies;

