const mongoose = require("mongoose");

const profileIconsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
    unique: true,    
  },
  profileImages: [{
    type: String,    
    required: true,  
  }],
 
  

}, { timestamps: true });  

module.exports= mongoose.model("ProfileIcon", profileIconsSchema);


