
const mongoose=require("mongoose")

const ProfileSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.ObjectId,ref:"User"},
  
  profiles: [
    {
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
      myList: {
        type: [String], 
        default: [], 
      },
    },
  ],
});

module.exports=mongoose.model("Profile", ProfileSchema)
