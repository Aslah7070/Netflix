// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../../axiosInstance/api";
// import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from "react-icons/fa";
// import { BiLike } from "react-icons/bi";
// import { VscMute } from "react-icons/vsc";
// const MovieDetails = () => {
//   const { movieId } = useParams(); // Get the movie ID from the URL
//   const [isHovered, setIsHovered] = useState(false);
//   const videoRef = useRef(null);
  
// const [movie,setMovie]=useState("")
//        useEffect(()=>{
//     try {
//      const  display=async()=>{
//         const response= await api.get(`/moviedetails/${movieId}`)
//         console.log("re",response.data.movie);
//         setMovie(response.data.movie)
//      }
//      display()
//     } catch (error) {
//         console.log("hello");
        
//     }
     
//        },[movieId])
//   if (!movie) return <div>Loading...</div>; 
//   console.log("movie",movie)


//   const handleMouseEnter = () => {
//     console.log("hedj");
    
//     setIsHovered(true);
//     if (videoRef.current) {
//       videoRef.current.play(); // Play video when hovering
//     }
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     if (videoRef.current) {
//       videoRef.current.pause(); // Pause video when mouse leaves
//     }
//   };
//   return (
//      <div className="grid grid-cols-1 md:grid-cols-1">
//             {/* Image Section */}
//             <div className="relative h-64 md:h-auto">
//               <img
//                 src={movie.thumbnailUrl}
//                 alt={movie.title}
//                 className="w-full h-full object-cover"
//                 onMouseEnter={handleMouseEnter}  
//           onMouseLeave={handleMouseLeave}
//               />
//                 {isHovered && (
//           <video
//             ref={videoRef}
//             src={movie.videoUrl} // URL of the video
//             className="absolute top-0 left-0 w-full h-full object-cover"
//             autoPlay
//             muted
//             loop
//           />
//         )}
//               <div className="absolute bottom-4 flex space-x-4 w-full justify-around">
//                 <div className="flex justify-evenly w-1/3">
//                   <button className="bg-white text-black py-2 px-4 rounded-lg font-semibold flex items-center space-x-2">
//                     <span className="material-icons">
//                       <FaPlay />
//                     </span>
//                     <span>Play</span>
//                   </button>
//                   <button className="bg-gray-500 text-white px-3 rounded-full font-semibold flex items-center space-x-2">
//                     <FaPlus />
//                   </button>
//                   <button className="bg-gray-500 text-white px-3 rounded-full font-semibold flex items-center space-x-2">
//                     <BiLike />
//                   </button>
//                 </div>
//                 <div className="flex">
//                   <button className="bg-gray-500 text-white px-3 rounded-full font-semibold flex items-center space-x-2">
//                     <VscMute />
//                   </button>
//                 </div>
//               </div>
//             </div>
    
//             {/* Details Section */}
//             <div className="w-full flex">
//               <div className="p-6 flex w-3/5 flex-col justify-between">
//                 <div>
//                   <span className="text-gray-400 mb-4">{movie.releaseYear}</span>
//                   <span className="text-gray-400 mb-4 ms-5">
//                     {movie.duration || 2}h{" "}
//                     <span className="text-sm ms-1 px-1 border border-1">HD</span>
//                   </span>
//                 </div>
//                 <div>
//                   <span className="text-gray-400 mb-4 border border-1">{movie.rating}</span>
//                   <span className="text-gray-400 mb-4 ms-5">{movie.maturityRating}</span>
//                 </div>
//                 <div className="mt-4">
//                   <span className="text-gray-400 mb-4">{movie.description}</span>
//                 </div>
//               </div>
//               <div className="p-6 text-sm text-gray-500">
//                 <p className="mb-2">
//                   <span className="font-semibold text-white">Cast:</span> {movie.cast}
//                 </p>
//                 <p className="mb-2">
//                   <span className="font-semibold text-white">Genre:</span> {movie.genre.join(", ")}
//                 </p>
//                 <p className="mb-2">
//                   <span className="font-semibold text-white">Writer:</span> {movie.writer}
//                 </p>
//                 <p className="mb-2">
//                   <span className="font-semibold text-white">Director:</span> {movie.director}
//                 </p>
//               </div>
//             </div>
//           </div>
//   );
// };

// export default MovieDetails;



import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../axiosInstance/api";
import { FaPlay, FaPlus, FaThumbsUp } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { VscMute } from "react-icons/vsc";

const MovieDetails = () => {
  const { movieId } = useParams(); // Get the movie ID from the URL
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const [movie, setMovie] = useState(null); // Set initial movie state to null

  useEffect(() => {
    const display = async () => {
      try {
        const response = await api.get(`/moviedetails/${movieId}`);
        setMovie(response.data.movie);
      } catch (error) {
        console.log("Error fetching movie details:", error);
      }
    };
    display();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play(); // Play video when hovering
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause(); // Pause video when mouse leaves
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1">
      {/* Image Section */}
      <div className="relative h-64 md:h-auto">
        <img
          src={movie.thumbnailUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {isHovered && (
          <video
            ref={videoRef}
            src={movie.videoUrl} // Ensure this URL is valid
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            onLoadedData={() => {
              if (videoRef.current) {
                videoRef.current.play(); // Ensure video starts playing once it's loaded
              }
            }}
          />
        )}
        <div className="absolute bottom-4 flex space-x-4 w-full justify-around">
          <div className="flex justify-evenly w-1/3">
            <button className="bg-white text-black py-2 px-4 rounded-lg font-semibold flex items-center space-x-2">
              <FaPlay />
              <span>Play</span>
            </button>
            <button className="bg-gray-500 text-white px-3 rounded-full font-semibold flex items-center space-x-2">
              <FaPlus />
            </button>
            <button className="bg-gray-500 text-white px-3 rounded-full font-semibold flex items-center space-x-2">
              <BiLike />
            </button>
          </div>
          <div className="flex">
            <button className="bg-gray-500 text-white px-3 rounded-full font-semibold flex items-center space-x-2">
              <VscMute />
            </button>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full flex">
        <div className="p-6 flex w-3/5 flex-col justify-between">
          <div>
            <span className="text-gray-400 mb-4">{movie.releaseYear}</span>
            <span className="text-gray-400 mb-4 ms-5">
              {movie.duration || 2}h{" "}
              <span className="text-sm ms-1 px-1 border border-1">HD</span>
            </span>
          </div>
          <div>
            <span className="text-gray-400 mb-4 border border-1">{movie.rating}</span>
            <span className="text-gray-400 mb-4 ms-5">{movie.maturityRating}</span>
          </div>
          <div className="mt-4">
            <span className="text-gray-400 mb-4">{movie.description}</span>
          </div>
        </div>
        <div className="p-6 text-sm text-gray-500">
          <p className="mb-2">
            <span className="font-semibold text-white">Cast:</span> {movie.cast}
          </p>
          <p className="mb-2">
            <span className="font-semibold text-white">Genre:</span> {movie.genre.join(", ")}
          </p>
          <p className="mb-2">
            <span className="font-semibold text-white">Writer:</span> {movie.writer}
          </p>
          <p className="mb-2">
            <span className="font-semibold text-white">Director:</span> {movie.director}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
