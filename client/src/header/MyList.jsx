





// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useSelector } from "react-redux";
// import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from "react-icons/fa";
// import { Outlet, useNavigate } from "react-router-dom";
// import api from "../axiosInstance/api";
// import { toast } from "react-toastify"; 
// import { TiTick } from "react-icons/ti";
// const MyList = () => {

  
//     const [isOverlayVisible, setIsOverlayVisible] = useState(false);
//     const [selectedMovie, setSelectedMovie] = useState(null);
//      const [hoveredMovie, setHoveredMovie] = useState(null);
//        const currentProfile = useSelector((state) => state.profile.currentProfile);


//         const [movies, setMovies] = useState([]);
//         console.log("movies",movies);
        
  
  
//   useEffect(() => {
//     getList();
//   }, [currentProfile]);

//   const getList = async () => {
//     try {
//       const response = await api.get(`/getmoviesfromList/${currentProfile._id}`);

//       setMovies(response.data.movies);
//     } catch (error) {
//       console.error("Error fetching movie list:", error);
//     }
//   };
       
// const navigate=useNavigate()
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

//   const handleMovieDetails = (movie) => {
//     console.log("handle movie");
    
//     setSelectedMovie(movie);
//     setIsOverlayVisible(true);
//     navigate(movie._id)
//   };

//   const playVideo=(movieID)=>{
//     console.log("work");
    
//     navigate(`/movieplayer/${movieID}`)
//   }
//   const handleclose=()=>{
//     setIsOverlayVisible(false)
//     setSelectedMovie(null);
//     console.log("dsafd");
    
//     navigate("/")
//   }


//   const handleRemove=async(movieId)=>{
// try {
//   console.log("movieId",movieId);
//   console.log("");
//   console.log("currentProfilesssssssssssssss",currentProfile._id);
  
//   const response=await api.post("/removemoviefromList",{movieId:movieId,profileId:currentProfile._id})
//   if(response.status===200){
//     getList();
//     toast.success("Movie removed from the list!");
//   }
//   console.log("handleAddList",response);
// } catch (error) {
//   console.log("error",error);
//   toast.error("Failed to remove the movie from the list.");
  
// }


    
//   }
//   return (
//     <div className="relative mx-auto mt-10 w-full h-screen   px-6 z--10">
//       <h2 className="text-start text-2xl font-semibold text-white mb-4">
//       Action Movies
//       </h2>

//      {  movies.length===0?(
//          <h1 className="text-center text-3xl font-semibold text-gray-300 py-10">
//          No movies added to your list
//        </h1>
//      ): <Slider {...settings}>

//   {movies.map((movie) => (
//     <div key={movie._id} className="p-2">
//       <div
//         className="rounded-lg h-32 overflow-hidden relative cursor-pointer transition-transform transform ease-in-out"
//         onClick={(e) => {
//           e.stopPropagation();
//           playVideo(movie._id);
//         }}
//         onMouseEnter={() => setHoveredMovie(movie._id)}
//         onMouseLeave={() => setHoveredMovie(null)}
//       >
//         <img
//           src={movie.thumbnailUrl}
//           alt={movie.title || "Movie Thumbnail"}
//           className="w-full h-40 object-cover rounded-lg"
//           loading="lazy"
//         />

//         {hoveredMovie === movie._id && (
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 transition-opacity duration-300">
//             <h3 className="text-white text-lg font-semibold">
//               {movie.title || "Untitled"}
//             </h3>
//             <p className="text-gray-400 text-sm">
//               {movie.duration || "N/A"} • {movie.genre.join(", ")}
//             </p>
//             <div className="flex gap-2 mt-2">
//               <button className="bg-white text-black p-2 rounded-full">
//                 <FaPlay />
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleRemove(movie._id);
//                 }}
//                 className="bg-gray-600 text-white p-2 rounded-full"
//               >
//                 <TiTick />
//               </button>
//               <button className="bg-gray-600 text-white p-2 rounded-full">
//                 <FaThumbsUp />
//               </button>
//               <button
//                 onClick={(event) => {
//                   event.stopPropagation(); 
//                   setIsOverlayVisible(true);
//                   handleMovieDetails(movie);
//                 }}
//                 className="bg-gray-600 text-white p-2 rounded-full"
//               >
//                 <FaChevronDown />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   ))}

//   {/* Render empty placeholders for remaining slots if movies count < 6 */}
//   {[...Array(6 - movies.length)].map((_, index) => (
//     <div key={`empty-${index}`} className="p-2">
//       <div className="rounded-lg h-32 overflow-hidden " />
//     </div>
//   ))}
// </Slider>}

    


//       {isOverlayVisible && selectedMovie && (
//   <div
//     className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
//     style={{
//       height: "100vh",
//       overflow: "hidden",
//     }}
//   >
//     <div
//       className="relative bg-gray-900 text-white rounded-lg shadow-lg max-w-3xl w-full"
//       style={{
//         maxHeight: "90vh",
//         overflowY: "auto",
//         scrollbarWidth: "none",
//         msOverflowStyle: "none", 
//       }}
//     >
    
//         <button
//         className="absolute top-2 right-2 bg-black text-white text-lg rounded-full px-2  focus:outline-none z-50"
//         onClick={handleclose}
//         aria-label="Close Overlay"
//       >
//         ✕
//       </button>

//       {/* Outlet for Nested Routes */}
//       <Outlet/>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };

// export default MyList;



import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { FaPlay, FaThumbsUp, FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { TiTick } from "react-icons/ti";
import api from "../axiosInstance/api";
import { Outlet, useNavigate } from "react-router-dom";
import { setCart } from "../redux/profile.slice";
import PrimeNavBar from "./PrimeNavBar";

export const getList = async (profileId) => {
  try {
    console.log("hey hello");
    
    const response = await api.get(`/getmoviesfromList/${profileId}`);
    return response.data.movies; // Return movies
  } catch (error) {
    console.error("Error fetching movie list:", error);
    throw error;
  }
};

const MyList = () => {
  const currentProfile = useSelector((state) => state.profile.currentProfile);
  const [movies, setMovies] = useState([]);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  console.log("moviesss",movies);
  
  useEffect(() => {
    if (currentProfile) {
      (async () => {
        const movies = await getList(currentProfile._id);
        setMovies(movies);
        dispatch(setCart(movies))
      })();
    }
  }, [currentProfile]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handleMovieDetails = (movie) => {
    setSelectedMovie(movie);
    setIsOverlayVisible(true);
    navigate(movie._id);
  };

  const playVideo = (movieID) => {
    navigate(`/movieplayer/${movieID}`);
  };

  const handleClose = () => {
    setIsOverlayVisible(false);
    setSelectedMovie(null);
    navigate("/");
  };

  const handleRemove = async (movieId) => {
    try {
      const response = await api.post("/removemoviefromList", {
        movieId,
        profileId: currentProfile._id,
      });
      if (response.status === 200) {
        const updatedMovies = await getList(currentProfile._id);
        setMovies(updatedMovies);
        toast.success("Movie removed from the list!");
      }
    } catch (error) {
      console.error("Failed to remove movie:", error);
      toast.error("Failed to remove the movie from the list.");
    }
  };

  return (
    <div className="relative mx-auto mt-10 w-full bg-black h-screen px-6">
         <PrimeNavBar/>
      <div className="flex justify-start">
      <h2 className="text-start text-2xl font-semibold text-white mb-4">
   My List
      </h2>
      </div>
     
      {movies.length === 0 ? (
        <h1 className="text-center text-3xl font-semibold text-gray-300 py-10">
          No movies added to your list
        </h1>
      ) : (
       
        <Slider {...settings}>

   {movies.map((movie) => (
    <div key={movie._id} className="p-2">
      <div
        className="rounded-lg h-32 overflow-hidden relative cursor-pointer transition-transform transform ease-in-out"
        onClick={(e) => {
          e.stopPropagation();
          playVideo(movie._id);
        }}
        onMouseEnter={() => setHoveredMovie(movie._id)}
        onMouseLeave={() => setHoveredMovie(null)}
      >
        <img
          src={movie.thumbnailUrl}
          alt={movie.title || "Movie Thumbnail"}
          className="w-full h-40 object-cover rounded-lg"
          loading="lazy"
        />

        {hoveredMovie === movie._id && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 transition-opacity duration-300">
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(movie._id);
                }}
                className="bg-gray-600 text-white p-2 rounded-full"
              >
                <TiTick />
              </button>
              <button className="bg-gray-600 text-white p-2 rounded-full">
                <FaThumbsUp />
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation(); 
                  setIsOverlayVisible(true);
                  handleMovieDetails(movie);
                }}
                className="bg-gray-600 text-white p-2 rounded-full"
              >
                <FaChevronDown />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  ))}

  {[...Array(6 - movies.length)].map((_, index) => (
    <div key={`empty-${index}`} className="p-2">
      <div className="rounded-lg h-32 overflow-hidden " />
    </div>
  ))}
</Slider>
      )}
      {isOverlayVisible && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative bg-gray-900 text-white rounded-lg shadow-lg max-w-3xl w-full">
            <button
              className="absolute top-2 right-2 bg-black text-white text-lg rounded-full px-2 focus:outline-none"
              onClick={handleClose}
              aria-label="Close Overlay"
            >
              ✕
            </button>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyList;
