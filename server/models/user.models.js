


// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   username: {
//     type: String,
//     default: null,
//   },
//   image: {
//     type: String,
//     default: "", 
//   },
//   searchHistory: {
//     type: Array,
//     default: [],
//   }, 
 


  
//   role: {
//     type: String,
//     enum: ["user", "admin", "premium"],
//     default: "user", 
//   },

// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);


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
    default: "",
  },
  searchHistory: {
    type: Array,    
    default: [],
  },
  premiumStartDate: { type: Date, default: null },
  profiles: [
    {
      name: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        default: "",  // Optionally default to a placeholder image
      },
      myList: [
        {
          movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",  // Assuming you have a Movie model
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          thumbnailUrl: {
            type: String,
            required: true,
          },
          videoUrl: {
            type: String,
            required: true,
          },
          genre: {
            type: String,
            required: true,
          },
          duration: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
  role: {
    type: String,
    enum: ["user","premium"],
    default: "user",
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
