import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../axiosInstance/api";

const MoviePlayer = () => {
  const { movieId } = useParams(); // Get movieId from route params
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await api.post(`/findvideo/${movieId}`); // Fetch movie by ID
        
        console.log("response",response)
        setVideoUrl(response.data.video)
      } catch (err) {
        setError("An error occurred while fetching the video");
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  if (loading) {
    return <div className="text-black text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        {error || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="relative mx-auto mt-10 w-full px-6">
      <h2 className="text-center text-2xl font-semibold text-white mb-4">
        Movie Playerasdasfadsfadsfdfewa
      </h2>
      {videoUrl ? (
        <video
          controls
          autoPlay
          className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="text-gray-500 text-center">No video available</div>
      )}
    </div>
  );
};

export default MoviePlayer;
