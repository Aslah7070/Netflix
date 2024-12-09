const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  password: {
    type: String,
    required: true,
   
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
    
  },
  username: {
    type: String,
    default: null, 
  },
  image: {
    type: String,
    default: ""
  },
  searchHistory: {
    type: Array, 
    default: [], 
  },
});


module.exports = mongoose.model('User', userSchema);
