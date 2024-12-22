
const User = require('../../models/user.models')
const Movie = require('../../models/video.models'); 


const addToProfileMyList = async (req, res) => {
  const { userId, profileName, movieId } = req.body;

  try {
    
    const user = await User.findById({userId});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = user.profiles.find((profile) => profile.name === profileName);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
 
    
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

   

    const movieExists = profile.myList.some((item) => item.movieId.toString() === movieId);
    if (movieExists) {
      return res.status(400).json({ message: 'Movie is already in the list' });
    }

    
    profile.myList.push({
      movieId: movie._id,
      title: movie.title,
      thumbnailUrl: movie.thumbnailUrl,
      videoUrl: movie.videoUrl,
      genre: movie.genre,
      duration: movie.duration,
    });

    await user.save();

    return res.status(200).json({ message: 'Movie added to MyList', profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addToProfileMyList };
