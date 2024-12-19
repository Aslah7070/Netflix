const Movie=require("../../models/video.models")

const movieDetails=async(req,res)=>{
try {
    const { movieId} = req.params;

    console.log("movieID",movieId)
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({success: true,movie});
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie", error: error.message });
  }
   
}

module.exports={movieDetails}