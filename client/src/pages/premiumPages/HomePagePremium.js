



import React, { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "../../redux/slice";
import api from "../../axiosInstance/api";
import { setMovies } from "../../redux/movieSlice";
import { VscMute } from "react-icons/vsc";
import { GoUnmute } from "react-icons/go";
import { PiWarningCircle } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import PrimeNavBar from "../../header/PrimeNavBar";

// Lazy load movie categories
const IndianMovies = React.lazy(() => import("./categories/IndianMovies"));
const FunMovies = React.lazy(() => import("./categories/FunMovies"));
const ActionMovies = React.lazy(() => import("./categories/ActionMovies"));
const HindiMovies = React.lazy(() => import("./categories/HindiMovies"));
const ThamilMovies = React.lazy(() => import("./categories/ThamilMovies"));

const HomePagePremium = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);
  const movies = useSelector((state) => state.movies.movies);
  console.log("email dsaflksmdfaldskfmadskladskjgfuaydsgfuadsygfudy",email);
  

   const currentProfile=useSelector((state)=>state.profile.currentProfile)
  console.log("currentProfiles",currentProfile.blockedCollection);
 
const allProfile=useSelector((state)=>state.profile.Profiles)
  const [menuVisible, setMenuVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const primeToken = Cookies.get("premiumToken");
  const backgroundVideo = movies?.[8]?.videoUrl || null;
  const movieName = movies?.[8]?.title || "Guest";
  const rating = movies?.[8]?.rating || "N/A";
console.log("backgroundVideo0",backgroundVideo);

  const display = () => {
    setShowModal(!primeToken);
  };

  useEffect(() => {
    display();
  }, [primeToken]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("fetchmovies");
         console.log("response.data.data",response.data.data);

        const  moviess = response.data.data.filter(
          (movie) => !currentProfile.blockedCollection.some(
            (blockedMovie) => blockedMovie._id.toString() === movie._id.toString()
          )
        );  
        console.log("moviess",moviess);
        

         

        dispatch(setMovies(moviess));
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };

    fetchMovies();
  }, [dispatch,currentProfile,allProfile]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleLogOut = async () => {
    try {
      await api.post("/logout");
      dispatch(setLoginStatus(false));
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="relative w-full bg-gray-950 h-full overflow-hidden pb-16">
      {/* Modal for pending payment */}
      {showModal && (
        <Modal show={showModal} onHide={handleModalClose} centered>
          <Modal.Body className="text-center bg-dark text-white p-4">
            <h4 className="fw-bold">Your payment is pending.</h4>
            <p className="mt-3">In the meantime, browse TV shows and movies.</p>
            <Button variant="light" onClick={handleModalClose} className="mt-3">
              OK
            </Button>
          </Modal.Body>
        </Modal>
      )}

      {/* Background Video */}
      {backgroundVideo && (
        <video
          className="absolute top-0 left-0 w-full h-screen object-cover"
          src={backgroundVideo}
          autoPlay
          loop
          muted={isMuted}
        ></video>
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

    
      <PrimeNavBar />

  
      <div className="relative flex flex-col lg:flex-row justify-between items-center z-10 text-white px-5 lg:px-10 py-5 mt-20 lg:mt-96">
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          <h1 className="text-2xl lg:text-4xl font-bold">{movieName}</h1>
          <div className="flex flex-wrap justify-center lg:justify-start space-x-3 space-y-2 lg:space-y-0">
            <button className="flex items-center px-4 py-2 text-sm bg-white text-black rounded-md hover:bg-red-700 sm:px-6 sm:py-3 sm:text-base">
              <FaPlay className="mr-1 sm:mr-2" />
              Play
            </button>
            <button className="flex items-center px-4 py-2 text-sm bg-gray-500 text-black rounded-md hover:bg-red-700 sm:px-6 sm:py-3 sm:text-base">
              <PiWarningCircle className="mr-1 sm:mr-2" />
              More Info
            </button>
            <button
              onClick={handleLogOut}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 sm:px-6 sm:py-3 sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-5 lg:mt-0 text-center lg:text-right">
          <span className="block text-lg lg:text-xl border border-1 px-5 py-2 mb-5 lg:mb-10 inline-block">
            {rating}
          </span>
          {isMuted ? (
            <VscMute
              className="text-2xl lg:text-4xl px-5 py-2 cursor-pointer"
              onClick={toggleMute}
            />
          ) : (
            <GoUnmute
              className="text-2xl lg:text-4xl px-5 py-2 cursor-pointer"
              onClick={toggleMute}
            />
          )}
        </div>
      </div>

      {/* Movie Categories */}
      <div className="relative z-10 bg-opacity-90 text-white space-y-8 pt-8 mt-36">
        <Suspense fallback={<div>Loading...</div>}>
          <IndianMovies />
          <FunMovies />
          <ActionMovies />
          <HindiMovies />
          <ThamilMovies />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePagePremium;

