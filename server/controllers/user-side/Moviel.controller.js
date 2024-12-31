const Movie=require("../../models/video.models");
const { message } = require("../../validations/signupValidation");
const Restricted=require("../../models/restricted.modes")

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
        { title: { $regex: q, $options: 'i' } }, 
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

const nameBasedSearch=async(req,res)=>{
  const {q}=req.query
  console.log("q",q);
  

  if (!q) {
    return res.status(400).json({ success: false, message: 'Search query is required' });
  }
  const movie=await Movie.find({ title: { $regex: q, $options: 'i' } })
  res.status(200).json({success:movie})
}

const restrictedMovies=async(req,res)=>{
     const {id}=req.params
     console.log("id",id);
        if(!id){
          return res.status(404).json({success:false,message:"id not found"})
        }
     const movie= await Movie.findById(id)
     if(!movie){
      return res.status(404).json({success:false, message:"movie not found"})
     }
    

     const excistingMovies=await Restricted.findOne({movie:movie.title}) 
     if(excistingMovies){
      return res.status(404).json({success:false,message:"movie is already excist"})
     }

     const newRestricted=new Restricted({
        movie:movie.title
     })

  const savedMovie= await newRestricted.save()
  
    
  
console.log("movie",savedMovie);

     res.status(200).json({success:true, title:savedMovie.movie})
  
     
     
}

const removeFromRestricted = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: "Movie title not provided" });
  }

  try {
    const deleteResult = await Restricted.deleteOne({ movie: title });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    let balanceMovies = await Restricted.find(); // Fetch updated list
    balanceMovies = balanceMovies.map((movie) => movie.movie); // Extract movie titles
    console.log("balanceMovies",balanceMovies);
    

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
      balanceMovies,
    });
  } catch (error) {
    console.error("Error removing restricted movie:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};



module.exports={movieDetails,movieSearch,nameBasedSearch,restrictedMovies,removeFromRestricted}