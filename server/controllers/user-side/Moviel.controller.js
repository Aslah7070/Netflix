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

const movieSearch=async(req,res)=>{
  try {
    const { q } = req.query; 
    
    console.log("req.query",req.query);
    
    if (!q) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    const movies = await Movie.find({
      $or: [
        { title: { $regex: q, $options: 'i' } }, // Case-insensitive search
        { description: { $regex: q, $options: 'i' } },
        { director: { $regex: q, $options: 'i' } },
        { genre: { $regex: q, $options: 'i' } },
        { cast: { $regex: q, $options: 'i' } },
      ],
    });

    res.status(200).json({ success: true, data: movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

module.exports={movieDetails,movieSearch}