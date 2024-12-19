



// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useSelector } from "react-redux";
// import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from "react-icons/fa";

// const IndianMovies = () => {
//   // Fetch movies (filtering Drama)
//   const movies = useSelector((state) => state.movies.movies) || [];
//   const dramaMovies = movies.filter((movie) => movie.genre.includes("Comedy"));

//   // Slider settings
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 2,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 4,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   const [hoveredMovie, setHoveredMovie] = useState(null);

//   return (
//     <div className="relative mx-auto mt-10 w-full px-6 z-10">
//       <h2 className="text-start text-2xl font-semibold text-white mb-4">
//         Indian fun Movies
//       </h2>

//       {/* Slider Component */}
//       <Slider {...settings}>
//         {dramaMovies.map((movie) => (
//           <div
//             key={movie._id}
//             className="p-2"
//             onMouseEnter={() => setHoveredMovie(movie._id)}
//             onMouseLeave={() => setHoveredMovie(null)}
//           >
//             <div className="rounded-lg h-32 overflow-hidden relative cursor-pointer transition-transform transform ease-in-out">
//               {/* Always display the thumbnail image */}
//               <img
//                 src={movie.thumbnailUrl}
//                 alt={movie.title || "Movie Thumbnail"}
//                 className="w-full h-40 object-cover rounded-lg"
//                 loading="lazy"
//               />

//               {/* Overlay Content */}
//               <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
//                 <h3 className="text-white text-lg font-semibold">
//                   {movie.title || "Untitled"}
//                 </h3>
//                 <p className="text-gray-400 text-sm">
//                   {movie.duration || "N/A"} • {movie.genre.join(", ")}
//                 </p>
//                 <div className="flex gap-2 mt-2">
//                   <button className="bg-white text-black p-2 rounded-full">
//                     <FaPlay />
//                   </button>
//                   <button className="bg-gray-600 text-white p-2 rounded-full">
//                     <FaPlus />
//                   </button>
//                   <button className="bg-gray-600 text-white p-2 rounded-full">
//                     <FaThumbsUp />
//                   </button>
//                   <button className="bg-gray-600 text-white p-2 rounded-full">
//                     <FaChevronDown />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default IndianMovies;



// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useSelector } from "react-redux";
// import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from "react-icons/fa";
// import api from "../../../axiosInstance/api";
// import { useNavigate } from "react-router-dom";

// const IndianMovies = () => {
//   // Fetch movies (filtering Drama)
//   const movies = useSelector((state) => state.movies.movies) || [];
//   const dramaMovies = movies.filter((movie) => movie.genre.includes("Comedy"));
//   const navigate=useNavigate()

//   // Slider settings
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 2,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 4,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   const [hoveredMovie, setHoveredMovie] = useState(null);

//   // Function to handle click and send request
//   const handleMovieClick = async (movieId) => {
//     try {
//       navigate(`/movieplayer/${movieId}`)
//           console.log("movieId",movieId)
//     } catch (error) {
//       console.error("Error sending movie ID:", error);
//     }
//   };

//   const handleList=(movieId)=>{
//     console.log("hello");
    
//   }

//   return (
//     <div className="relative mx-auto mt-10 w-full px-6 z-10">
//       <h2 className="text-start text-2xl font-semibold text-white mb-4">
//         Indian fundddd Movies
//       </h2>

//       {/* Slider Component */}
//       <Slider {...settings}>
//         {dramaMovies.map((movie) => (
//           <div
//             key={movie._id}
//             className="p-2"
//             onMouseEnter={() => setHoveredMovie(movie._id)}
//             onMouseLeave={() => setHoveredMovie(null)}
//             onClick={()=>handleMovieClick(movie._id)}
//           >
//             <div className="rounded-lg h-32 overflow-hidden relative cursor-pointer transition-transform transform ease-in-out">
//               {/* Always display the thumbnail image */}
//               <img
//                 src={movie.thumbnailUrl}
//                 alt={movie.title || "Movie Thumbnail"}
//                 className="w-full h-40 object-cover rounded-lg"
//                 loading="lazy"
                
//               />

//               {/* Overlay Content */}
//               <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
//                 <h3 className="text-white text-lg font-semibold">
//                   {movie.title || "Untitled"}
//                 </h3>
//                 <p className="text-gray-400 text-sm">
//                   {movie.duration || "N/A"} • {movie.genre.join(", ")}
//                 </p>
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     className="bg-white text-black p-2 rounded-full"
                  
//                   >
//                     <FaPlay />
//                   </button>
//                   <button
//                     className="bg-gray-600 text-white p-2 rounded-full"
                    
//                   >
//                     <FaPlus />
//                   </button>
//                   <button
//                     className="bg-gray-600 text-white p-2 rounded-full"
                 
//                   >
//                     <FaThumbsUp />
//                   </button>
//                   <button
//                     className="bg-gray-600 text-white p-2 rounded-full"
//                 onClick={()=>handleList(movie._id)}
//                   >
//                     <FaChevronDown />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default IndianMovies;




// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useSelector } from "react-redux";
// import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const IndianMovies = () => {
//   const movies = useSelector((state) => state.movies.movies) || [];
//   const dramaMovies = movies.filter((movie) => movie.genre.includes("Comedy"));
//   const navigate = useNavigate();

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 2,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 4,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   const [hoveredMovie, setHoveredMovie] = useState(null);
//   const [selectedMovie, setSelectedMovie] = useState(null); // State for selected movie details

//   const handleMovieClick = (movieId) => {
//     navigate(`/movieplayer/${movieId}`);
//     console.log("movieId", movieId);
//   };

//   const handleList = (movie) => {
//     setSelectedMovie(movie); // Set the clicked movie's details
//   };

//   return (
//     <div className="relative mx-auto mt-10 w-full px-6 z-10">
//       <h2 className="text-start text-2xl font-semibold text-white mb-4">
//         Indian Comedy Movies
//       </h2>

//       {/* Slider Component */}
//       <Slider {...settings}>
//         {dramaMovies.map((movie) => (
//           <div
//             key={movie._id}
//             className="p-2"
//             onMouseEnter={() => setHoveredMovie(movie._id)}
//             onMouseLeave={() => setHoveredMovie(null)}
//             onClick={() => handleMovieClick(movie._id)}
//           >
//             <div className="rounded-lg h-32 overflow-hidden relative cursor-pointer transition-transform transform ease-in-out">
//               <img
//                 src={movie.thumbnailUrl}
//                 alt={movie.title || "Movie Thumbnail"}
//                 className="w-full h-40 object-cover rounded-lg"
//                 loading="lazy"
//               />

//               {/* Overlay Content */}
//               <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
//                 <h3 className="text-white text-lg font-semibold">
//                   {movie.title || "Untitled"}
//                 </h3>
//                 <p className="text-gray-400 text-sm">
//                   {movie.duration || "N/A"} • {movie.genre.join(", ")}
//                 </p>
//                 <div className="flex gap-2 mt-2">
//                   <button className="bg-white text-black p-2 rounded-full">
//                     <FaPlay />
//                   </button>
//                   <button className="bg-gray-600 text-white p-2 rounded-full">
//                     <FaPlus />
//                   </button>
//                   <button className="bg-gray-600 text-white p-2 rounded-full">
//                     <FaThumbsUp />
//                   </button>
//                   <button
//                     className="bg-gray-600 text-white p-2 rounded-full"
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent triggering parent click
//                       handleList(movie);
//                     }}
//                   >
//                     <FaChevronDown />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>

//       {/* Movie Details Section */}
//       {selectedMovie && (
//         <div className="bg-gray-800 p-4 mt-4 rounded-lg">
//           <h3 className="text-white text-lg font-bold">
//             {selectedMovie.title || "Untitled"}
//           </h3>
//           <p className="text-gray-400">Duration: {selectedMovie.duration || "N/A"}</p>
//           <p className="text-gray-400">Genre: {selectedMovie.genre.join(", ")}</p>
//           <p className="text-gray-400">Description: {selectedMovie.description || "No description available."}</p>
//           <button
//             className="bg-red-500 text-white p-2 rounded mt-2"
//             onClick={() => setSelectedMovie(null)} // Close details
//           >
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IndianMovies;




import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";

const FunMovies = () => {
  const movies = useSelector((state) => state.movies.movies) || [];
  const dramaMovies = movies.filter((movie) => movie.genre.includes("Comedy"));
  const navigate = useNavigate();

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
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movieId) => {
    navigate(`/movieplayer/${movieId}`);
    console.log("movieId", movieId);
  };

  const handleShowDetails = (movieId) => {
    // const movie = dramaMovies.find((m) => m._id === movieId);
    // setSelectedMovie(movie);


    navigate(`/details/${movieId}`)
    
  };

  return (
    <div className="relative mx-auto mt-10 w-full px-6 z--10">
      <h2 className="text-start text-2xl font-semibold text-white mb-4">
        Indian Fun Movies
      </h2>

      <Slider {...settings}>
        {dramaMovies.map((movie) => (
          <div
            key={movie._id}
            className="p-2"
            onMouseEnter={() => setHoveredMovie(movie._id)}
            onMouseLeave={() => setHoveredMovie(null)}
          >
            <div
              className="rounded-lg h-32 overflow-hidden relative cursor-pointer transition-transform transform ease-in-out"
              onClick={() => handleMovieClick(movie._id)}
            >
              <img
                src={movie.thumbnailUrl}
                alt={movie.title || "Movie Thumbnail"}
                className="w-full h-40 object-cover rounded-lg"
                loading="lazy"
              />
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
                  <button
                    className="bg-gray-600 text-white p-2 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowDetails(movie._id);
                    }}
                  >
                    <FaChevronDown />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Movie Details Section */}
      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-white text-lg font-bold">
              {selectedMovie.title || "Untitled"}
            </h3>
            <p className="text-gray-400">
              Duration: {selectedMovie.duration || "N/A"}
            </p>
            <p className="text-gray-400">
              Genre: {selectedMovie.genre.join(", ")}
            </p>
            <p className="text-gray-400">
              Description: {selectedMovie.description || "No description available."}
            </p>
            <button
              className="bg-red-500 text-white p-2 rounded mt-4"
              onClick={() => setSelectedMovie(null)} // Close details
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FunMovies;
