

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
  currentProfile: { type: mongoose.Schema.Types.ObjectId,ref:"Profile"},
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
