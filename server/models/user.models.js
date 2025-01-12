

const mongoose = require("mongoose");
const { type } = require("../validations/signupValidation");

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
 
  role: {
    type: String,
    enum: ["user","premium"],
    default: "user",
  },
  amount: { type: Number,},
  currentPlan: { type: String, enum: ["Mobile",'Basic', 'Standard', 'Premium'], default: 'Premium' },
  currentProfile: { type: mongoose.Schema.Types.ObjectId,ref:"Profile"},
  banned: { type: Boolean, default: false },
  
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
