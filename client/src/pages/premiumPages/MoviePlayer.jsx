import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../axiosInstance/api";
import { Modal, Button } from "react-bootstrap";
const MoviePlayer = () => {
  const { movieId } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleClosing = () => {
    setShow(false)
    navigate("/")
  }
  useEffect(() => {
    const fetchMovie = async () => {

      try {
        setLoading(true);
        const response = await api.post(`/findvideo/${movieId}`);
        console.log("response", response);
        setVideoUrl(response.data.video);
      } catch (err) {
        console.log("err",err);
        if(err.response.status===404&&err.response.data.message==="premium token missing"){
          console.log("please take premium");
          setError(true);
          return
          
        }else{
          setError(false);
        }
        
        setError("An error occurred while fetching the video");
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  useEffect(() => {
 
    if (videoRef.current && videoUrl) {
      videoRef.current.play();
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

  if (error) {
    return (
      <Modal show={show} onHide={handleClose} centered>
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

  return (
    <div className="relative mx-auto mt-10 w-full px-6">
      <h2 className="text-center text-2xl font-semibold text-white mb-4">
        Movie Player
      </h2>
      {videoUrl ? (
        <div className="relative w-full max-w-4xl mx-auto">
          
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
};

export default MoviePlayer;
