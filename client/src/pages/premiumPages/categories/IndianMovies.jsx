





import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import api from "../../../axiosInstance/api";
import { getList } from "../../../header/MyList";
import { TiTick } from "react-icons/ti";
import { setCart } from "../../../redux/profile.slice";

const HindiMovies = () => {
  const movies = useSelector((state) => state.movies.movies) || [];
  const currentProfile=useSelector((state)=>state.profile.currentProfile)
  const cart=useSelector((state)=>state.profile.myList)
  const dispatch=useDispatch()
    console.log("cart",cart);
console.log("currentProfilessssssssssssssssssssssssssssssssssssssssssssssssss",currentProfile.blockedCollection);

  let Drama = movies.filter((movie) => movie.genre.includes("Drama"));
  console.log("Dramassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",Drama);

  Drama = Drama.filter(
    (movie) => !currentProfile.blockedCollection.some(
      (blockedMovie) => blockedMovie._id.toString() === movie._id.toString()
    )
  );  


  
  
  
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
     const [hoveredMovie, setHoveredMovie] = useState(null);
const navigate=useNavigate()
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

  const handleMovieDetails = (movie) => {
    console.log("handle movie");
    
    setSelectedMovie(movie);
    setIsOverlayVisible(true);
    navigate(movie._id)
  };

  const playVideo=(movieID)=>{
    console.log("work");
    
    navigate(`/movieplayer/${movieID}`)
  }
  const handleclose=()=>{
    setIsOverlayVisible(false)
    setSelectedMovie(null);
    console.log("dsafd");
    
    navigate("/")
  }



  const handleAddList=async(movieId)=>{
    try {
      console.log("movieId",movieId);
      console.log("clickedddddddddddddddddddddddddddddd");
      console.log("currentProfilesssssssssssssss",currentProfile._id);
      
      const response=await api.post("/addmovietoList",{movieId:movieId,profileId:currentProfile._id})
      console.log("handleAddList",response);
      const movie= await getList(currentProfile._id)
      dispatch(setCart(movie))
      if(response.status===200&&response.data.message==="Movie removed success fully"){
        toast.success(response.data.message)
      }else{
        if(response.status===200&&response.data.message==="Movie added to the list"){
          toast.success(response.data.message)
        }
      }
    } catch (error) {
      console.log("error",error);
      
    }
  }
  
  return (
    <div className="relative mx-auto mt-10 w-full px-6 z--10">
      <h2 className="text-start text-2xl font-semibold text-white mb-4">
        indian drama Movies
      </h2>

      {/* Slider Component */}
      <Slider {...settings}>
        {Drama.map((movie) => (
          <div key={movie._id} className="p-2">
            <div className="rounded-lg h-32 overflow-hidden relative cursor-pointer transition-transform transform ease-in-out"
            onClick={(e)=>{
              playVideo(movie._id)
              e.stopPropagation()
            }}
            onMouseEnter={() => setHoveredMovie(movie._id)}
            onMouseLeave={() => setHoveredMovie(null)}
            >
              {/* Always display the movie thumbnail */}
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
                  handleAddList(movie._id);
                }}
                className="bg-gray-600 text-white p-2 rounded-full"
              >
                {cart.some(item => item._id === movie._id) && currentProfile ?(
                    <TiTick/>
                ):(
                    
                      <FaPlus />
                )}
                
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
      </Slider>

      {isOverlayVisible && selectedMovie && (
  <div
    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
    style={{
      height: "100vh",
      overflow: "hidden",
    }}
  >
    <div
      className="relative bg-gray-900 text-white rounded-lg shadow-lg max-w-3xl w-full"
      style={{
        maxHeight: "90vh",
        overflowY: "auto",
        scrollbarWidth: "none", 
        msOverflowStyle: "none", 
      }}
    >
    
        <button
        className="absolute top-2 right-2 bg-black text-white text-lg rounded-full px-2  focus:outline-none z-50"
        onClick={handleclose}
        aria-label="Close Overlay"
      >
        ✕
      </button>
      <Outlet/>
    </div>
  </div>
)}
    </div>
  );
};

export default HindiMovies;
