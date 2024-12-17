// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import api from '../../axiosInstance/api';

// const VideoPlayer = ({ movieId }) => {
//   const [loading, setLoading] = useState(true);
//   const videoRef = useRef(null);
//   const [videoUrl, setVideoUrl] = useState(null);

//   useEffect(() => {
//     const movieId= "675fbb2170ba775ec04e7b78"
//     const fetchVideoStream = async () => {
//       try {
        
//         setLoading(true);
//         const response = await api.get(`/stream/${movieId}`, {
//           headers: {
//             'Range': 'bytes=0-', 
//           },
//           responseType: 'stream', 
//         });

        
//         const videoBlob = await new Response(response.data).blob();
//         const videoUrl = URL.createObjectURL(videoBlob);
//         setVideoUrl(videoUrl);
//       } catch (error) {
//         console.error('Error fetching video stream:', error);
//       } finally {
//         setLoading(false);
//       }  
//     };

//     if (movieId) {
//       fetchVideoStream();
//     }


//     // Cleanup when the component is unmounted
//     return () => {
//       if (videoUrl) {
//         URL.revokeObjectURL(videoUrl);
//       }
//     };
//   }, [movieId]);

//   return (
//     <div className="video-player-container">
//       {loading ? (
//         <p>Loading video...</p>
//       ) : (
//         <video ref={videoRef} controls autoPlay className="video-player">
//           {videoUrl && <source src={videoUrl} type="video/mp4" />}
//           Your browser does not support the video tag.
//         </video>
//       )}
//     </div>
//   );
// };

// export default VideoPlayer;



// import React, { useState, useEffect } from "react";

// const VideoPlayer = () => {
//   const [loading, setLoading] = useState(true);
//   const [videoUrl, setVideoUrl] = useState("");
// const movieId= "675fbb2170ba775ec04e7b78"
//   useEffect(() => {
//     // Construct the video streaming URL
//     const fetchVideoUrl = async () => {
//       try {
//         setLoading(true);
//         const url = `http://localhost:3000/stream/${movieId}`;
//         setVideoUrl(url);
//       } catch (error) {
//         console.error("Error fetching video URL:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (movieId) {
//       fetchVideoUrl();
//     }
//   }, [movieId]);

//   return (
//     <div className="video-player-container">
//       {loading ? (
//         <p>Loading video...</p>
//       ) : (
//         <video controls autoPlay width="100%">
//           <source src={videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       )}
//     </div>
//   );
// };

// export default VideoPlayer;
