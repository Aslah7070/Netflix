

 
const mongoose = require("mongoose");

const Movie = require("../../models/video.models");
const { uploadToCloudinary } = require("../../middlewares/videoUploading");
const { upload } = require("../../middlewares/videoUploading");
const axios = require("axios");

const TVShow=require("../../models/TvShow.model"); 
const { findOne } = require("../../models/user.models");
// Handle Video Uploading
// const videoUploading = async (req, res) => {
//   try {
//     console.log("Uploading files...");

//     // Use Multer to get files in memory
//     upload.fields([
//       { name: "videoFile", maxCount: 1 },
//       { name: "imageFile", maxCount: 1 },
//     ])(req, res, async (err) => {
//       if (err) {
//         return res.status(500).json({ message: "Multer error", error: err.message });
//       }

//       if (!req.files || !req.files.videoFile || !req.files.imageFile) {
//         return res.status(400).json({ message: "Both video and image files are required!" });
//       }

//       // Upload Video to Cloudinary
//       const videoUrl = await uploadToCloudinary(req.files.videoFile[0].buffer, "video", "movies/videos");
//       console.log("Video URL:", videoUrl);

//       // Upload Thumbnail to Cloudinary
//       const thumbnailUrl = await uploadToCloudinary(req.files.imageFile[0].buffer, "image", "movies/images");
//       console.log("Thumbnail URL:", thumbnailUrl);

//       const {
//         title,
//         description,
//         director,
//         writer,
//         cast,
//         genre,
//         language,
//         releaseYear,
//         duration,
//         maturityRating,
//         rating,
//       } = req.body;

//       const castArray = cast.split(",");
//       const genreArray = genre.split(",");

//       const newMovie = new Movie({
//         title,
//         description,
//         director,
//         writer,
//         cast: castArray,
//         genre: genreArray,
//         language,
//         releaseYear: parseInt(releaseYear),
//         duration: parseInt(duration),
//         videoUrl,
//         thumbnailUrl,
//         maturityRating,
//         rating,
//         createdAt: new Date(),
//       });

//       const savedMovie = await newMovie.save();

//       res.status(201).json({
//         message: "Movie uploaded successfully!",
//         movie: savedMovie,
//       });
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Error uploading movie", error: error.message });
//   }
// };




const videoUploading = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

   
    if (!req.files || !req.files.videoFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Both video and image files are required!" });
    }

    const videoUrl = req.files.videoFile[0].path;  
    const thumbnailUrl = req.files.imageFile[0].path;  

    const {
      title,
      description,
      director,
      writer,
      cast,
      genre,
      language,
      releaseYear,
      duration,
      maturityRating,
      rating,
    } = req.body;

    
    const castArray = cast.split(",");
    const genreArray = genre.split(",");

    
    const newMovie = new Movie({
      title,
      description,
      director,
      writer,
      cast: castArray,
      genre: genreArray,
      language,
      releaseYear: parseInt(releaseYear),
      duration: parseInt(duration),
      videoUrl,
      thumbnailUrl,
      maturityRating,
      rating,
      createdAt: new Date(),
    });


    const savedMovie = await newMovie.save();


    res.status(201).json({
      message: "Movie uploaded successfully!",
      movie: savedMovie,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error uploading movie", error: error.message });
  }
};


const fetchMovies=async(req,res)=>{

      const movies=await Movie.find()
    
if(!movies){
return res.status(404).json({success:false,message:"no movies"})
}
res.status(200).json({success:true,message:"recievsd",data:movies})
     
}

const fetchMovieIdBased=async(req,res)=>{
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ 
      success: true,
      title: movie.title,
      description: movie.description,
      videoUrl: movie.videoUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie", error: error.message });
  }

}

const findTheSingleMovie=async(req,res)=>{
  const { id } = req.params;
  const movie = await Movie.findById(id);
if(!id){
  return res.status(404).json({success:false,message:"id is not found"})
}
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.status(200).json({success:true,message:"movie founded",movie})

}





const streamVideo = async (req, res) => {
  try {
    console.log("Streaming initiated");

    const { id } = req.params;

   
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const videoUrl = movie.videoUrl;


    const response = await axios.head(videoUrl);
    const videoSize = Number(response.headers["content-length"]); 
    console.log("Video size:", videoSize);

    
    const range = req.headers.range;
    if (!range) {
      return res.status(400).send("Range header is required for video streaming.");
    }

  
    const CHUNK_SIZE = 10 ** 6; 
    const start = Number(range.replace(/\D/g, "")); 
    const end = Math.min(start + CHUNK_SIZE - 1, videoSize - 1);

    const contentLength = end - start + 1;

    console.log(`Streaming bytes: ${start} - ${end}`);

    // Set HTTP Headers
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    });

    // Fetch the video chunk from external URL
    const videoStream = await axios({
      method: "get",
      url: videoUrl,
      headers: { Range: `bytes=${start}-${end}` },
      responseType: "stream",
    });

    
    videoStream.data.pipe(res);
  } catch (error) {
    console.error("Error streaming video:", error.message);
    res.status(500).json({ message: "Error streaming video", error: error.message });
  }
};


const findthVideo = async (req, res) => {
  try {
    const { movieId } = req.params;
console.log("movieId",movieId)
    // Validate movieId
    if (!movieId) { 
      return res.status(400).json({
        success: false,
        message: "Movie ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Movie ID format",
      });
    }

    // Fetch movie details
    const movieDetails = await Movie.findOne({ _id: movieId });
    if (!movieDetails) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    // Send response with video URL
    const video = movieDetails.videoUrl;
    return res.status(200).json({
      success: true,
      message: "Video found",
      video,
    });   
  } catch (error) {
    console.error("Error fetching video:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the video",
    });
  }
};




const uploadTvShow = async (req, res) => {
  const {
    title,
    rating,
    maturityRating,
    seasons, // optional
    numberOfSeasons,
    releaseYear,
    language,
    genre,
    cast,
    writer,
    director,
    description,
  } = req.body;

  const genreArray = genre ? genre.split(",").map((item) => item.trim()) : [];
  const castArray = cast ? cast.split(",").map((item) => item.trim()) : [];

  try {
    const newTVShow = new TVShow({
      title,
      rating,
      maturityRating,
      seasons: seasons || [], // Default to an empty array if not provided
      numberOfSeasons,
      releaseYear,
      language,
      genre: genreArray,
      cast: castArray,
      writer,
      director,
      description,
      createdAt: new Date(),
    });

    const savedTVShow = await newTVShow.save();
    res.status(201).json({
      message: "TV Show uploaded successfully",
      tvShow: savedTVShow,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error uploading TV Show",
      error: error.message,
    });
  }
};

const uploadEpisodes = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id",id);
    
    const { seasonNumber, episodeNumber, title, description, duration, airDate, durationOfEpisode } = req.body;

    console.log("Uploaded Files:", req.files);

   
    if (!req.files || !req.files.videoFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Both video and image files are required!" });
    }
    console.log("seasonNumber",seasonNumber);
    
    // Find the TV show
    const tvshow = await TVShow.findById(id);
    if (!tvshow) {
      return res.status(404).json({ success: false, message: "TV Show not found" });
    }
    const videoUrl = req.files.videoFile[0].path;  
    const thumbnailUrl = req.files.imageFile[0].path;  

    // Construct new episode object
    console.log("videoUrl",videoUrl);
    const newEpisode = {
      episodeNumber: parseInt(episodeNumber, 10),
      title,
      description,
      duration: parseInt(duration, 10),
      airDate: new Date(airDate),
      durationOfEpisode: parseInt(durationOfEpisode, 10),
      videoUrl,
      thumbnailUrl,
    };

    // Check if the season exists
    const seasonIndex = tvshow.seasons.findIndex(
      (season) => season.seasonNumber === parseInt(seasonNumber, 10)
    );

    if (seasonIndex === -1) {
      // Add new season
      tvshow.seasons.push({
        seasonNumber: parseInt(seasonNumber, 10),
        episodes: [newEpisode],
      });
    } else {
      // Update existing season
      tvshow.seasons[seasonIndex].episodes.push(newEpisode);
    }

    // Save the TV show
    await tvshow.save();

    res.status(200).json({
      success: true,
      message: `Episode successfully ${
        seasonIndex === -1 ? "added to new season" : "updated in existing season"
      }`,
      tvShow: tvshow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while uploading episodes",
      error: error.message,
    });
  }
};




module.exports = { videoUploading,fetchMovies,fetchMovieIdBased,streamVideo,findthVideo,uploadTvShow ,uploadEpisodes,findTheSingleMovie};
