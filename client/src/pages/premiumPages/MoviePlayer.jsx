



import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../axiosInstance/api";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import blockedImage from "../../assets/blockedwarning.webp"
import { FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
const MoviePlayer = () => {
  const { movieId } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const primeToken = Cookies.get("sub");



  const currentProfile = useSelector((state) => state.profile.currentProfile);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleClosing = () => {
    setShowModal(false);
    navigate("/");
  };

  const fetchMovieDetails = async () => {
    try {
      console.log("Target Movie ID:", movieId);
      console.log("Filter Movies:", currentProfile.filterMovies);

      const isMovieAllowed = currentProfile.filterMovies.some((movie) =>
        movie._id.toString() === movieId
      );

      console.log("Is Movie Allowed:", isMovieAllowed);

      if (!isMovieAllowed) {
        const response = await api.post(`/findvideo/${movieId}`);
        console.log("Video API Response:", response);
        setVideoUrl(response.data.video);
        setShowModal(false);
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId && currentProfile) {
      fetchMovieDetails();
    }
  }, [movieId, currentProfile]);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.error("Autoplay failed:", err);
      });
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  }, [videoUrl]);

  const handleClose = () => {
    navigate("/");
  };

  if (loading) {
    return <div className="text-black text-center mt-10">Loading...</div>;
  }

  if (!primeToken) {
    return (
      <Modal show={true} onHide={handleClosing} centered>
        <Modal.Body className="text-center bg-dark text-white p-4">
          <h4 className="fw-bold">Your payment is pending.</h4>
          <p className="mt-3">In the meantime, browse TV shows and movies.</p>
          <Button variant="light" onClick={handleClosing} className="mt-3">
            OK
          </Button>
          <button
            type="button"
            className="btn-close btn-close-white position-absolute top-0 end-0 me-3 mt-3"
            onClick={handleClosing}
            aria-label="Close"
          ></button>
        </Modal.Body>
      </Modal>
    );
  }

  if (showModal) {
    return (
      <div className="relative flex flex-col justify-center items-center h-screen bg-black text-white text-center px-4 py-8">
        {/* Close Icon */}
        <div className="absolute top-4 right-4">
          <FaTimes
            onClick={() => navigate(-1)}
            className="text-white text-3xl cursor-pointer hover:text-red-500"
          />
        </div>

        {/* Content */}
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
  } else {
    return (
      <div className="relative mx-auto mt-10 w-full px-6 bg-black">
        <h2 className="text-center text-2xl font-semibold text-white mb-4">
          Movie Player
        </h2>
        {videoUrl ? (
          <div className="relative w-full max-w-4xl  mx-auto">
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={handleClose}
                className="bg-black text-white p-2 rounded-full"
              >
                X
              </button>
            </div>
            <video
              ref={videoRef}
              controls
              autoPlay
              muted
              className="w-full rounded-lg shadow-lg"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="text-gray-500 text-center">No video available</div>
        )}
      </div>
    );
  }


};

export default MoviePlayer;
