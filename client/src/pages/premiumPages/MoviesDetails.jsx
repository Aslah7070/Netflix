



// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FaPlay, FaPlus } from "react-icons/fa";
// import { BiLike } from "react-icons/bi";
// import { VscMute } from "react-icons/vsc";
// import { GoUnmute } from "react-icons/go";
// import { Modal, Button } from "react-bootstrap";
// import api from "../../axiosInstance/api";

// const MovieDetails = () => {
//   const { movieId } = useParams();
//   const navigate = useNavigate();
//   const videoRef = useRef(null);

//   const [movie, setMovie] = useState(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const [showModal, setShowModal] = useState(false);

//   const currentProfile = useSelector((state) => state.profile.currentProfile);

//   useEffect(() => {
//     const display = async () => {
//       try {
//         const movieFound = currentProfile.filterMovies.some(
//           (movie) => movie._id === movieId
//         );

//         if (movieFound) {
//           const response = await api.get(`/moviedetails/${movieId}`);
//           setMovie(response.data.movie);
//         } else {
//           setShowModal(true); // Show modal for blocked movies
//         }
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//       }
//     };

//     display();
//   }, [movieId, currentProfile]);

//   if (!movie) return <div>Loading...</div>;

//   const toggleMute = () => setIsMuted((prevMuted) => !prevMuted);

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//     videoRef.current?.play();
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     videoRef.current?.pause();
//   };

//   const playVideo = (movieID) => navigate(`/movieplayer/${movieID}`);

//   const handleCloseModal = () => setShowModal(false);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-1">
//       {/* Modal for Blocked Movie */}
      
//          <div>
//          <Modal show={showModal} onHide={handleCloseModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Movie Blocked</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           This movie is blocked in your profile due to content restrictions.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleCloseModal}>
//             OK
//           </Button>
//         </Modal.Footer>
//       </Modal>
//          </div>
//       <div
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         className="relative h-64 md:h-auto"
//       >
//         <img
//           src={movie.thumbnailUrl || ""}
//           alt={movie.title || "Movie Thumbnail"}
//           className="w-full h-full object-cover"
//         />
     
//         {isHovered && (
//           <video
//             ref={videoRef}
//             src={movie.videoUrl || ""}
//             className="absolute top-0 left-0 w-full h-full object-cover"
//             autoPlay
//             muted={isMuted}
//             loop
//           />
//         )}
//         <div className="absolute bottom-4 flex space-x-4 w-full justify-around">
//           <div className="flex justify-evenly w-1/3">
//             <button
//               onClick={() => playVideo(movie._id)}
//               className="bg-white text-black py-2 px-4 rounded-lg font-semibold flex items-center space-x-2"
//             >
//               <FaPlay />
//               <span>Play</span>
//             </button>
//             <button className="bg-gray-500 text-white px-3 rounded-full font-semibold flex items-center space-x-2">
//               <FaPlus />
//             </button>
//             <button className="bg-gray-500 text-white px-3 rounded-full font-semibold flex items-center space-x-2">
//               <BiLike />
//             </button>
//           </div>
//           <div className="flex">
//             <button
//               className="bg-gray-500 text-white px-3 rounded-full font-semibold flex items-center space-x-2"
//               onClick={toggleMute}
//             >
//               {isMuted ? <VscMute /> : <GoUnmute />}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="w-full flex">
//         <div className="p-6 flex w-3/5 flex-col justify-between">
//           <div>
//             <span className="text-gray-400 mb-4">{movie.releaseYear}</span>
//             <span className="text-gray-400 mb-4 ms-5">
//               {movie.duration || 2}h{" "}
//               <span className="text-sm ms-1 px-1 border border-1">HD</span>
//             </span>
//           </div>
//           <div>
//             <span className="text-gray-400 mb-4 border border-1">
//               {movie.rating}
//             </span>
//             <span className="text-gray-400 mb-4 ms-5">
//               {movie.maturityRating}
//             </span>
//           </div>
//           <div className="mt-4">
//             <span className="text-gray-400 mb-4">{movie.description}</span>
//           </div>
//         </div>
//         <div className="p-6 text-sm text-gray-500">
//           <p className="mb-2">
//             <span className="font-semibold text-white">Cast:</span>{" "}
//             {movie.cast}
//           </p>
//           <p className="mb-2">
//             <span className="font-semibold text-white">Genre:</span>{" "}
//             {movie.genre?.join(", ")}
//           </p>
//           <p className="mb-2">
//             <span className="font-semibold text-white">Writer:</span>{" "}
//             {movie.writer}
//           </p>
//           <p className="mb-2">
//             <span className="font-semibold text-white">Director:</span>{" "}
//             {movie.director}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;









import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPlay, FaPlus } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { VscMute } from "react-icons/vsc";
import { GoUnmute } from "react-icons/go";
import { Modal, Button } from "react-bootstrap";
import api from "../../axiosInstance/api";
import blockedImage from "../../assets/blockedwarning.webp"

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [movie, setMovie] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const currentProfile = useSelector((state) => state.profile.currentProfile);

  const fetchMovieDetails = async () => {
    try {
      console.log("Target Movie ID:", movieId);
      console.log("filterMovies:", currentProfile.filterMovies);
      
      const isMovieAllowed = currentProfile.filterMovies.some((movie) => {
        if (!movie || !movie._id) {
          console.log("Invalid movie object:", movie);
          return false;
        }
        console.log("Checking Movie ID:", movie._id.toString());
        return movie._id.toString() === movieId;
      });
      
      console.log("Is Movie Allowed:", isMovieAllowed);
      
      console.log("current profile ",currentProfile)
      console.log("isMovieAllowed ",isMovieAllowed)


      if (isMovieAllowed) {
        const response = await api.get(`/moviedetails/${movieId}`);
        setMovie(response.data.movie);
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };


  useEffect(() => {
    fetchMovieDetails();
  }, [movieId, currentProfile]);

  

  const toggleMute = () => setIsMuted((prevMuted) => !prevMuted);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
  };

  const playVideo = (movieID) => navigate(`/movieplayer/${movieID}`);

  const handleCloseModal = () => {
    setShowModal(false);
 
    
  };

  if(!movie&&showModal){
    return (
      <div className="flex flex-col justify-center items-center h-[75vh] bg-black text-white text-center px-4 py-8">

<div className="mb-8">
          <img
          
            src={blockedImage}
            alt="Blocked Movie"
            className="rounded-lg w-48 shadow-xl"
          />
        </div>
        <h1 className="text-4xl font-extrabold mb-6">Movie Blocked</h1>
        <p className="text-xl mb-4 text-gray-300">
          This movie is blocked in your profile due to content restrictions.
        </p>
       
        <div className="mt-6 text-lg text-gray-200">
          <p>
            If you believe this is an error, please contact support or review your
            profile settings.
          </p>
        </div>
      </div>
    );
  }else{
    return (
      <div className="grid grid-cols-1 md:grid-cols-1">
        {/* Modal for Blocked Movie */}
        
        {/* Movie Details Section */}
         
  
            <div
            
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative h-64 md:h-auto"
            >
             
  
              <img
                src={movie?.thumbnailUrl || ""}
                alt={movie?.title || "Movie Thumbnail"}
                className="w-full h-full object-cover"
              />
  
              {isHovered && (
                <video
                  ref={videoRef}
                  src={movie?.videoUrl || ""}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay
                  muted={isMuted}
                  loop
                />
              )}
              <div className="absolute bottom-4 flex space-x-4 w-full justify-around">
                <div className="flex justify-evenly w-1/3">
                  <button
                    onClick={() => playVideo(movie?._id)}
                    className="bg-white text-black py-2 px-4 rounded-lg font-semibold flex items-center space-x-2"
                  >
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
                  <button
                    className="bg-gray-500 text-white px-3 rounded-full font-semibold flex items-center space-x-2"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VscMute /> : <GoUnmute />}
                  </button>
                </div>
              </div>
            </div>
  
            
            <div className="w-full flex">
              <div className="p-6 flex w-3/5 flex-col justify-between">
                <div>
                  <span className="text-gray-400 mb-4">{movie?.releaseYear}</span>
                  <span className="text-gray-400 mb-4 ms-5">
                    {movie?.duration || 2}h{" "}
                    <span className="text-sm ms-1 px-1 border border-1">HD</span>
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 mb-4 border border-1">
                    {movie?.rating}
                  </span>
                  <span className="text-gray-400 mb-4 ms-5">
                    {movie?.maturityRating}
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-gray-400 mb-4">{movie?.description}</span>
                </div>
              </div>
              <div className="p-6 text-sm text-gray-500">
                <p className="mb-2">
                  <span className="font-semibold text-white">Cast:</span>{" "}
                  {movie?.cast}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-white">Genre:</span>{" "}
                  {movie?.genre.join(", ")}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-white">Writer:</span>{" "}
                  {movie?.writer}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-white">Director:</span>{" "}
                  {movie?.director}
                </p>
              </div>
            </div>
        
      </div>
    );
  }

 
};

export default MovieDetails;
