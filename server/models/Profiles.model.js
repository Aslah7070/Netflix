
// const mongoose=require("mongoose")

// const ProfileSchema = new mongoose.Schema({
//     user:{type:mongoose.Schema.ObjectId,ref:"User"},
  
//   profiles: [
//     {
//       name: {
//         type: String,
//         required: true,
//         trim: true,
//       },
//       image: {
//         type: String,
//         required: false,
//         trim: true,
//       },
//       avatar: {
//         type: String,
//         required: false,
//         trim: true,
//       },
//       myList: {
//         type: [String], 
//         default: [], 
//       },
//     },
//   ],
// });

// module.exports=mongoose.model("Profile", ProfileSchema)


const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    avatar: {
      type: String,
      required: false,
      trim: true,
    },
    myList: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
