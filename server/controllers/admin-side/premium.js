



const Movie = require("../../models/video.models");
const upload = require('../../middlewares/videoUploading');  

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


  console.log("hello");
  
      const movies=await Movie.find()
      console.log("dssdf");
      
if(!movies){
return res.status(404).json({success:false,message:"no movies"})
}
res.status(200).json({success:true,message:"recievsd",data:movies})
      console.log("moives",movies)
}

module.exports = { videoUploading,fetchMovies };
