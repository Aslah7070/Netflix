// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({

//   password: {
//     type: String,
//     required: true,
   
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true, 
    
//   },
//   username: {
//     type: String,
//     default: null, 
//   },
//   image: {
//     type: String,
//     default: ""
//   },
//   searchHistory: {
//     type: Array, 
//     default: [], 
//   },
// });


// module.exports = mongoose.model('User', userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: "", // URL of the profile picture
  },
  searchHistory: {
    type: Array,
    default: [],
  }, 


  
  role: {
    type: String,
    enum: ["user", "admin", "premium"],
    default: "user", 
  },

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
