// const videoUploading = async (req, res) => {



//     console.log("Request Body:", req.body); // Log the form fields
//     console.log("Uploaded File:", req.file); // Log the uploaded file info
  
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: 'No video file uploaded' });
//       }
  
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
//         thumbnailUrl,
//         maturityRating,
//         rating
//       } = req.body;
  
//       const castArray = cast.split(',');
//       const genreArray = genre.split(',');
  
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
//         videoUrl: req.file.secure_url,
//         thumbnailUrl,
//         maturityRating,
//         rating,
//         createdAt: new Date(),
//       });
  
//       const savedMovie = await newMovie.save();
  
//       res.status(201).json({
//         message: 'Movie uploaded successfully!',
//         movie: savedMovie,
//       });
//     } catch (error) {
//       console.error("error");
//       res.status(500).json({ message: 'Error uploading movie', error: error.message });
//     }
//   };
  
  
//   module.exports = { videoUploading };
  
// const Movie=require("../../models/video.models")

// const videoUploading = async (req, res) => {
//     console.log("Request Body:", req.body); 
//     console.log("Uploaded Files:", req.files || req.file);
  
//     try {
//       if (!req.file && !req.files) {
//         return res.status(400).json({ message: 'No video file(s) uploaded' });
//       }
//       console.log("videoUrl",req.files);
      
//       let videoUrl;
//       if (req.file) {
//         videoUrl = req.file.secure_url;
//       }
//       console.log("videoUrl",videoUrl);
      
      
//       // Handle multiple files
//       if (req.files && req.files.length > 0) {
//         videoUrl = req.files[0].path
//         thumbnailUrl=req.files[1].path
//          }
  
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
//         rating
//       } = req.body;
  
//       const castArray = cast.split(',');
//       const genreArray = genre.split(',');
  
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
//         videoUrl: videoUrl, 
//         thumbnailUrl:thumbnailUrl,
//         maturityRating,
//         rating,
//         createdAt: new Date(),
//       });
  
//       const savedMovie = await newMovie.save();
  
//       res.status(201).json({
//         message: 'Movie uploaded successfully!',
//         movie: savedMovie,
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       res.status(500).json({ message: 'Error uploading movie', error: error.message });
//     }
//   };


// const videoUploading = async (req, res) => {
//   try {
//     console.log("Request Body:", req.body);
//     console.log("Uploaded Files:", req.file);

//     // if (!req.files || req.files.length < 2) {
//     //   return res.status(400).json({ message: "At least two files are required: video and thumbnail" });
//     // }

//     // if (!req.file || !req.files) {
//     //     return res.status(400).json({ message: "Both video and image are required" });
//     // }
   
//     const videoUrl = req.files.path; // Video file
//     const thumbnailUrl = req.file.path; // Thumbnail file

//     const {
//       title,
//       description,
//       director,
//       writer,
//       cast,
//       genre,
//       language,
//       releaseYear,
//       duration,
//       maturityRating,
//       rating,
//     } = req.body;

//     const castArray = cast.split(",");
//     const genreArray = genre.split(",");

//     const newMovie = new Movie({
//       title,
//       description,
//       director,
//       writer,
//       cast: castArray,
//       genre: genreArray,
//       language,
//       releaseYear: parseInt(releaseYear),
//       duration: parseInt(duration),
//       videoUrl,
//       thumbnailUrl,
//       maturityRating,
//       rating,
//       createdAt: new Date(),
//     });

//     const savedMovie = await newMovie.save();

//     res.status(201).json({
//       message: "Movie uploaded successfully!",
//       movie: savedMovie,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Error uploading movie", error: error.message });
//   }
// };

  

//   module.exports = { videoUploading };



  
// const Movie=require("../../models/video.models")

// const upload = require('../../middlewares/videoUploading');  

// const videoUploading = async (req, res) => {
//   try {
//     console.log("Request Body:", req.body);
//     console.log("Uploaded Files:", req.files);

//     // Check if both video and image files are uploaded
//     if ( !req.file.videoFile || !req.file.imageFile) {
//       return res.status(400).json({ message: "Both video and image files are required!" });
//     }


//     const videoUrl = req.files.videoFile.path;  // Video file URL from Cloudinary
//     const thumbnailUrl = req.files.imageFile.path;  // Thumbnail file URL from Cloudinary

   
//     const {
//       title,
//       description,
//       director,
//       writer,
//       cast,
//       genre,
//       language,
//       releaseYear,
//       duration,
//       maturityRating,
//       rating,
//     } = req.body;

//     // Convert cast and genre from comma-separated strings to arrays
//     const castArray = cast.split(",");
//     const genreArray = genre.split(",");

//     // Create a new movie instance with the provided data
//     const newMovie = new Movie({
//       title,
//       description,
//       director,
//       writer,
//       cast: castArray,
//       genre: genreArray,
//       language,
//       releaseYear: parseInt(releaseYear),
//       duration: parseInt(duration),
//       videoUrl,
//       thumbnailUrl,
//       maturityRating,
//       rating,
//       createdAt: new Date(),
//     });

//     // Save the new movie to the database
//     const savedMovie = await newMovie.save();

//     // Respond with a success message and the saved movie details
//     res.status(201).json({
//       message: "Movie uploaded successfully!",
//       movie: savedMovie,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Error uploading movie", error: error.message });
//   }
// };

// module.exports = { videoUploading };



const Movie = require("../../models/video.models");
const upload = require('../../middlewares/videoUploading');  

const videoUploading = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);

    // Check if both video and image files are uploaded
    if (!req.files || !req.files.videoFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Both video and image files are required!" });
    }

    const videoUrl = req.files.videoFile[0].path;  // Video file URL from Cloudinary
    const thumbnailUrl = req.files.imageFile[0].path;  // Thumbnail file URL from Cloudinary

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

    // Convert cast and genre from comma-separated strings to arrays
    const castArray = cast.split(",");
    const genreArray = genre.split(",");

    // Create a new movie instance with the provided data
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

    // Save the new movie to the database
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

module.exports = { videoUploading };
