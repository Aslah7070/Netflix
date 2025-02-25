const MyList = require("../../models/myList.model");
const Movie=require("../../models/video.models")
const Profile=require("../../models/Profiles.model")

const mongoose = require("mongoose");


const addMovieToList = async (req, res) => {
  try {
    console.log("hello");

    const userId = req.user.userId; 
    console.log("userId:", userId);

    const { movieId, profileId } = req.body;

    console.log("movieId:", movieId, "profileId:", profileId);

  
    if (!profileId) {
      return res.status(404).json({ success: false, message: "Profile ID not found" });
    }

 
    const profile = await Profile.findOne({ _id: profileId });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    console.log("profile:", profile);

 
    const movie = await Movie.findOne({ _id: movieId });
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    console.log("movie:", movie);

   
    let list = await MyList.findOne({ profileId });
    if (!list) {
   
      list = new MyList({
        profileId,
        movies: [movieId] 
      });
    } else {
    
      if (!list.movies.includes(movieId)) {
        list.movies.push(movieId);
      } else {
        list.movies = list.movies.filter((id) => id.toString() !== movieId.toString());
        await list.save();
        return res.status(200).json({ success: true, message: "Movie removed success fully", list });
      }
    }

    // Save the list
    await list.save();

    console.log("Updated list:", list);

    return res.status(200).json({ success: true, message: "Movie added to the list", list });

  } catch (error) {
    console.error("Error adding movie to list:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getMoviesFromList = async (req, res) => {
  try {
    const { profileId } = req.params; // Assuming profileId is passed as a URL parameter

    // Validate `profileId`
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      return res.status(400).json({ success: false, message: "Invalid Profile ID" });
    }

    // Check if the profile exists
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    // Fetch the list for the profile
    const list = await MyList.findOne({ profileId }).populate("movies");
    if (!list || list.movies.length === 0) {
      return res.status(404).json({ success: false, message: "No movies found in this profile's list" });
    }

    return res.status(200).json({ success: true, movies: list.movies });
  } catch (error) {
    console.error("Error fetching movies from profile list:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



const removeMovieFromList = async (req, res) => {
  try {
    console.log("hello");

    const userId = req.user.userId;
    console.log("userId:", userId);

    const { movieId, profileId } = req.body;

    console.log("movieId:", movieId, "profileId:", profileId);

    // Validate `profileId`
    if (!profileId) {
      return res.status(404).json({ success: false, message: "Profile ID not found" });
    }

    // Fetch the profile
    const profile = await Profile.findOne({ _id: profileId });
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    console.log("profile:", profile);

    // Fetch the movie
    const movie = await Movie.findOne({ _id: movieId });
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    console.log("movie:", movie);

    // Fetch the list for the profile
    let list = await MyList.findOne({ profileId });
    if (!list) {
      return res.status(404).json({ success: false, message: "Movie list not found for this profile" });
    }

    // Check if the movie is in the list
    if (!list.movies.includes(movieId)) {
      return res.status(400).json({ success: false, message: "Movie not in the list" });
    }

    // Remove the movie from the list
    list.movies = list.movies.filter((id) => id.toString() !== movieId.toString());

    // Save the updated list
    await list.save();

    console.log("Updated list after removal:", list);

    return res.status(200).json({ success: true, message: "Movie removed from the list", list });

  } catch (error) {
    console.error("Error removing movie from list:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


module.exports = {
    addMovieToList,
    getMoviesFromList,
  
    removeMovieFromList,
};
