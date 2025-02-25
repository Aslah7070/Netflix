const Movie=require("../../models/video.models");
const { message } = require("../../validations/signupValidation");
const Restricted=require("../../models/restricted.modes")
const Profile=require("../../models/Profiles.model")

const movieDetails=async(req,res)=>{
try {
    const { movieId} = req.params;

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

  

  if (!q) {
    return res.status(400).json({ success: false, message: 'Search query is required' });
  }
  const movie=await Movie.find({ title: { $regex: q, $options: 'i' } })
  res.status(200).json({success:movie})
}

const restrictedMovies=async(req,res)=>{
     const {id}=req.params
     const {profileId}=req.body
     console.log("id",id);
        if(!id){
          return res.status(404).json({success:false,message:"id not found"})
        }
     const movie= await Movie.findById(id)
     if(!movie){
      return res.status(404).json({success:false, message:"movie not found"})
     }
    
   const profile=await Profile.findById(profileId)



   profile.blockedCollection.push(movie)
   await profile.save()
   
   
   

     res.status(200).json({success:true, message:"profile updated"})
  
     
     
}



const removeFromRestricted = async (req, res) => {
  const { movieID, profileId } = req.body;
  
  
console.log("sx");

  if (!movieID || !profileId) {
    return res.status(400).json({ success: false, message: "Movie title or profileId not provided" });
  }

  try {
    const profile = await Profile.findById(profileId);
    // console.log("profile",profile);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }


  
    const movieIndex = profile.blockedCollection.findIndex((movie) => movie._id.toString() === movieID.toString());
    if (movieIndex !== -1) {
      profile.blockedCollection.splice(movieIndex, 1);
      await profile.save(); 
    }

    

    
    let balanceMovies = await Restricted.find();
    balanceMovies = balanceMovies.map((movie) => movie.movie);

  

    return res.status(200).json({
      success: true,
      message: "Movie removed from restricted list and profile successfully",
      balanceMovies,
    });
  } catch (error) {
    console.error("Error removing restricted movie:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};




const movieFilterByRating = async (req, res) => {
  try {
    const { Rating,profileId } = req.body;
console.log("Rating",Rating);


    if (!Rating) {
      return res.status(400).json({ message: "Rating is required" });
    }

    if(!profileId){
      return res.status(200).json({success:false,message:"profile Id not found"})
    }

   
    const ratingValue = mapRatingToValue(Rating);
    console.log("ratingValue",ratingValue);
    

    if (ratingValue === null) {
      return res.status(400).json({ message: "Invalid rating format" });
    }

    const movies = await Movie.find({
      newmericRating: { $gte: ratingValue }
    });
    console.log("moviesRe",movies)

 

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found with the specified rating" });
    }

      const profile=await Profile.findById(profileId)
 
      profile.filterMovies = movies;
    await profile.save(); 

    return res.status(200).json(movies);
  } catch (error) {

    return res.status(500).json({ message: "An error occurred while fetching movies" });
  }
};


const mapRatingToValue = (rating) => {
  const ratingMap = {
    "U/A17+": "17",
    "U/A15+": "15",
    "U/A18+": "18",
    "U/A13+":"13",
    "U/A16+":"16",
  
  };

  return ratingMap[rating] || null; 
};





module.exports={movieDetails,movieSearch,nameBasedSearch,restrictedMovies,removeFromRestricted,movieFilterByRating}