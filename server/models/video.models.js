const { required } = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  director: { type: String, required: true },
  writer: { type: String },
  cast: { type: [String], required: true }, 
  genre: { type: [String], required: true },
  language: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  duration: { type: Number, required: true },
  videoUrl: { type: String},
  thumbnailUrl: { type: String }, 
  maturityRating: { type: String, required: true }, 
  rating:{type:String,required:true},
  createdAt: { type: Date, default: Date.now },
}); 

module.exports = mongoose.model('Movie', movieSchema);
