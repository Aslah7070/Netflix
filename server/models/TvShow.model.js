const mongoose = require('mongoose');

const tvShowSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  director: { type: String, required: true },
  writer: { type: String },
  cast: { type: [String], required: true },
  genre: { type: [String], required: true },
  language: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  numberOfSeasons: { type: Number, required: true },
  seasons: [
    {
      seasonNumber: { type: Number, required: true },
      episodes: [
        {
          episodeNumber: { type: Number, required: true },
          title: { type: String, required: true },
          description: { type: String },
          duration: { type: Number, required: true }, 
          airDate: { type: Date, required: true }, 
          durationOfEpisode: { type: Number, required: true }, 
          videoUrl: { type: String }, 
          thumbnailUrl: { type: String },
        }
      ]
    }
  ],
  maturityRating: { type: String, required: true },
  rating: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TVShow', tvShowSchema);
